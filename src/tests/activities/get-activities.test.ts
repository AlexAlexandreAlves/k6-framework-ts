import { check } from 'k6';

import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';
import GetActivities from '../../../src/requests/activities/get-activities-request.ts';

export let options = {
    scenarios: {
        light_load: {
            executor: 'constant-arrival-rate',
            rate: 5,
            timeUnit: '1s',
            duration: '10s',
            preAllocatedVUs: 5,
            maxVUs: 10,
        }
    }
};

export default function getActivity() {
    const request = new GetActivities();
    const response = request.executeRequest();

    console.log(response.status)
    check(response, {
        'Body is not null': (r) => r.body != null,
        "status is 200": (r) => r.status === 200,
    });
}

export function handleSummary(data: any) {
    const p95 = data.metrics.latency ? data.metrics.latency['p(95)'] : null;

    if (p95 !== null && p95 <= 200) {
        console.log(`ALERT: The latency p95 was less than 200ms (${p95}ms)`);
    }

    return {
        'report.html': htmlReport(data),
    };
}
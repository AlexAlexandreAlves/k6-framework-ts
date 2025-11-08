import { check } from 'k6';

import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';
import PostActivities from '../../requests/activities/post-activities-request.ts';
import { IActivitiesCreate } from '../../interface/IActivities.ts';

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
}

export default function createActivity() {
    const currentDate = new Date().toISOString();
    const request = new PostActivities();

    const newActivity: IActivitiesCreate = {
        title: "Generic title",
        dueDate: currentDate,
        completed: true
    };

    request.setJsonBodyFromTemplate(newActivity);
    
    const response = request.executeRequest();

    // Log the status code and response body example
    console.log("Status code: " + response.status, "Response body: " + response.body);

    // check assert example
    check(response, {
        'Body is not null': (r) => r.body != null,
         "status is 200": (r) => r.status === 200,
    });
};

// Another metric assert example
export function handleSummary(data: any) {
    const p95 = data.metrics.latency ? data.metrics.latency['p(95)'] : null;

    if (p95 !== null) {
        if (p95 <= 200) {
            console.log(`ALERT: The latency p95 was less than 200ms (${p95}ms)`);
        }
    }

    return {
        'report.html': htmlReport(data)
    };
}
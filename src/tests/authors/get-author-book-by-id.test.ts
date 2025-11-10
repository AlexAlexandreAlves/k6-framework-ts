import { check } from 'k6';

import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';
import { randomItem } from "https://jslib.k6.io/k6-utils/1.2.0/index.js";
import GetBookByAuthorId from '../../requests/authors/get-author-by-id-request.ts';
import Utils from '../../utils/utils.ts';

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


const bookId = Utils.readCsv('id-author.csv', false);


export default function getBookByAuthorId() {

    const randomId = randomItem(bookId);

    const request = new GetBookByAuthorId(String(randomId));
    const response = request.executeRequest();

    check(response, {
        'Body is not null': (r) => r.body != null,
         "status is 200": (r) => r.status === 200,
    });
};

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
import { check } from 'k6';

import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';
import { randomItem } from "https://jslib.k6.io/k6-utils/1.2.0/index.js";
import PostAuthors from '../../requests/authors/post-author-request.ts';
import { IAuthorCreate } from '../../interface/IAuthors.ts';
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

const authorsDataDriven = Utils.readCsv('post-author.csv');

export default function sendAuthor() {
    const authorData = randomItem(authorsDataDriven);
    const request = new PostAuthors();

    const newAuthor: IAuthorCreate = {
        idBook: parseInt(authorData[0]),
        firstName: authorData[1],
        lastName: authorData[2]
    };

    request.setJsonBodyFromTemplate(newAuthor);

    const response = request.executeRequest();

    console.log("Status code: " + response.status, "Response body: " + response.body);

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
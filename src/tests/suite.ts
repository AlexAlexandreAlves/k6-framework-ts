import { group } from "k6";
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';
import createAuthor from './authors/post-author.test.ts';
import createActivity from "./activities/post-activities.test.ts";


/**
**IMPORTANT**
If you want to control the Load through the suite.ts, you have to unconsider the options defined in the individual test files.
*/

export let options = {
    scenarios: {
        createActivity: {
            executor: 'ramping-arrival-rate',
            exec: 'createActivitySuite',
            timeUnit: '1s',
            preAllocatedVUs: 5,
            maxVUs: 10,
            stages: [
                { target: 10, duration: '30s' },
                { target: 0, duration: '10s' }
            ],
        },

        createAuthor: {
            executor: 'ramping-arrival-rate',
            exec: 'createAuthorSuite',
            timeUnit: '1s',
            preAllocatedVUs: 5,
            maxVUs: 10,
            stages: [
                { target: 10, duration: '30s' },
                { target: 0, duration: '10s' }
            ],
        },
    },
};

export function createActivitySuite(): void {
    group('Create Activity', () => {
        createActivity();
    });
}

export function createAuthorSuite(): void {
    group('Create Author', () => {
        createAuthor();
    });
}

export function handleSummary(data: any): Record<string, string> {
    return {
        'relatorio.html': htmlReport(data)
    };
}
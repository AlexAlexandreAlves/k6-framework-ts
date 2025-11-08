import http from 'k6/http';

/**
   When use ramping-arrival? 
   When you want to gradually increase the request rate over time, simulating a more realistic load pattern.
   */
export const options = {
    discardResponseBodies: true,
    scenarios: {
        light_load: {
            executor: 'ramping-arrival-rate',
            rate: 5,
            timeUnit: '1s',
            duration: '10s',
            preAllocatedVUs: 5,
            maxVUs: 10,
        }
    }
}

export default function () {
    http.get('https://test.k6.io');
}

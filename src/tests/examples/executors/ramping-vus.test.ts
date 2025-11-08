import http from 'k6/http';

/**
   When use ramping-vus? 
   When you want to simulate a specific number of virtual users over time, regardless of the request rates.
   This approach is more useful for scenarios where you want to maintain a steady load on the system, for example.
   */

export const options = {
    discardResponseBodies: true,
    scenarios: {
        light_load: {
            executor: 'ramping-vus',
            vus: 5,
            duration: '10s',
        }
    }
}

export default function () {
    http.get('https://test.k6.io');
}

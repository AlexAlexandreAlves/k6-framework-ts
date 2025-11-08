import http from 'k6/http';


/**
   When use externally-controlled? 
   When you want to have full control over the pacing and behavior of your virtual users, allowing for dynamic adjustments during the test.
   */

export const options = {
    discardResponseBodies: true,
    scenarios: {
        light_load: {
            executor: 'externally-controlled',
            exec: 'request',
            vus: 5,
            duration: '10s',
        }
    }
}

export default function () {
    http.get('https://test.k6.io');
}

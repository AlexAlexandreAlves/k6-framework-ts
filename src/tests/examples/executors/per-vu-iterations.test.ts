import http from 'k6/http';


/**
   When use per-vu-iterations? 
   When you want to control the number of iterations each virtual user will execute, allowing for more granular load testing.
   */
export const options = {
    discardResponseBodies: true,
    scenarios: {
        light_load: {
            executor: 'per-vu-iterations',
            exec: 'request',
            vus: 5,
            iterations: 10,
        }
    }
}

export default function () {
    http.get('https://test.k6.io');
}

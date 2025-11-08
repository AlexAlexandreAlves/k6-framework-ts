import {
  errorCounter,
  successCounter,
  throughput,
  latency,
  ttfb,
  connectTime,
  sendTime,
  receiveTime,
  responseBodySize,
  requestBodySize,
} from './metrics.ts';


export function recordMetrics(request: RequestMetrics, response: ResponseMetrics): void {
  const isSuccess = response.status >= 200 && response.status < 300;

  if (isSuccess) {
    successCounter.add(1, { name: request.tag });
  } else {
    errorCounter.add(1, {
      name: request.tag,
      error_code: response.status,
      response_body: response.body
    });
  }

  throughput.add(response.timings.duration);
  latency.add(response.timings.waiting);
  ttfb.add(response.timings.receiving);
  connectTime.add(response.timings.connecting);
  sendTime.add(response.timings.sending);
  receiveTime.add(response.timings.receiving);

  const responseBodyLenght = typeof response.body === 'string'
    ? response.body.length
    : response.body
      ? JSON.stringify(response.body).length
      : 0;
  responseBodySize.add(responseBodyLenght);

  const requestBodyLength = typeof request.jsonBody === 'string'
    ? request.jsonBody.length
    : request.jsonBody
      ? JSON.stringify(request.jsonBody).length
      : 0;
  requestBodySize.add(requestBodyLength);
}

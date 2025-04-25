export class NotOkResponseError<T> extends Error {
  readonly method: string;
  readonly url: string;
  readonly status: number;
  readonly responseBody: T;

  constructor(
    method: string,
    url: string,
    status: number,
    responseBody: T,
    ...params: Parameters<ErrorConstructor>
  ) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, Error);
    }

    this.name = "ResponseError";
    this.method = method;
    this.url = url;
    this.status = status;
    this.responseBody = responseBody;

    this.message = `[${method} ${url}] (${status}): ${JSON.stringify(responseBody)}`;
  }
}

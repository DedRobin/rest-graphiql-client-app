export enum HttpMethod {
  POST = "POST",
  GET = "GET",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
  TRACE = "TRACE",
  OPTIONS = "OPTIONS",
  HEAD = "HEAD",
}

export type MethodsWithSearchParams =
  | HttpMethod.GET
  | HttpMethod.DELETE
  | HttpMethod.TRACE
  | HttpMethod.OPTIONS
  | HttpMethod.HEAD;

export type MethodsWithBody =
  | HttpMethod.POST
  | HttpMethod.PATCH
  | HttpMethod.PUT;

const methodsWithSearchParams: MethodsWithSearchParams[] = [
  HttpMethod.GET,
  HttpMethod.DELETE,
  HttpMethod.TRACE,
  HttpMethod.OPTIONS,
  HttpMethod.HEAD,
];

const methodsWithBody: MethodsWithBody[] = [
  HttpMethod.POST,
  HttpMethod.PATCH,
  HttpMethod.PUT,
];

export const METHODS: HttpMethod[] = [
  ...methodsWithSearchParams,
  ...methodsWithBody,
];

export function isMethodWithSearchParams(
  method: string,
): method is MethodsWithSearchParams {
  return methodsWithSearchParams.includes(method as MethodsWithSearchParams);
}

export function isMethodWithBody(method: string): method is MethodsWithBody {
  return methodsWithBody.includes(method as MethodsWithBody);
}

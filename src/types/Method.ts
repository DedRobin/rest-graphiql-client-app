export enum HttpMethod {
  POST = "POST",
  GET = "GET",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

export type MethodsWithSearchParams = HttpMethod.GET | HttpMethod.DELETE;

export type MethodsWithBody =
  | HttpMethod.POST
  | HttpMethod.PATCH
  | HttpMethod.PUT;

const methodsWithSearchParams: MethodsWithSearchParams[] = [
  HttpMethod.GET,
  HttpMethod.DELETE,
];

const methodsWithBody: MethodsWithBody[] = [
  HttpMethod.POST,
  HttpMethod.PATCH,
  HttpMethod.PUT,
];

export function isMethodWithSearchParams(
  method: string,
): method is MethodsWithSearchParams {
  return methodsWithSearchParams.includes(method as MethodsWithSearchParams);
}

export function isMethodWithBody(method: string): method is MethodsWithBody {
  return methodsWithBody.includes(method as MethodsWithBody);
}

export interface HttpResponse<T> extends Response {
  result?: T;
  message?: string;
  validations?: { field: string, error: string }[]
}
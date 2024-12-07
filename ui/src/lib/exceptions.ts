interface ErrorActionOptions {
  actionHandler?: () => void;
  actionText?: string;
}

export class PageError extends Error {
  errorActionOptions?: ErrorActionOptions;
  constructor(message = "Error", errorActionOptions?: ErrorActionOptions) {
    super(message);
    this.errorActionOptions = errorActionOptions;
  }
}

export class BadRequestError extends PageError {
  constructor(message = "Bad Request", errorActionOptions?: ErrorActionOptions) {
    super(message, errorActionOptions);
    this.name = "BadRequestError";
  }
}

export class UnauthorizedError extends PageError {
  constructor(message = "Unauthorized access", errorActionOptions?: ErrorActionOptions) {
    super(message, errorActionOptions);
    this.name = "UnauthorizedError";
  }
}

export class UnauthenticatedError extends PageError {
  constructor(message = "Unauthenticated access", errorActionOptions?: ErrorActionOptions) {
    super(message, errorActionOptions);
    this.name = "UnauthenticatedError";
  }
}

export class InternalServerError extends PageError {
  constructor(message = "Internal server error", errorActionOptions?: ErrorActionOptions) {
    super(message, errorActionOptions);
    this.name = "InternalServerError";
  }
}

export class NotImplementedError extends PageError {
  constructor(message = "Not implemented", errorActionOptions?: ErrorActionOptions) {
    super(message, errorActionOptions);
    this.name = "NotImplementedError";
  }
}

export class ServiceUnavailableError extends PageError {
  constructor(message = "Service unavailable", errorActionOptions?: ErrorActionOptions) {
    super(message, errorActionOptions);
    this.name = "ServiceUnavailableError";
  }
}

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean | undefined;
  public readonly status: string | undefined;

  constructor(
    message: string,
    statusCode: number,
    isOperational: boolean = true,
    status: string
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.status = status;
    Error.captureStackTrace(this, this.constructor);
  }
}

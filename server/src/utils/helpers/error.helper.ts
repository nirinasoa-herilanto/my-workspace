/**
 * Use to display a custom error
 */
export class AppError extends Error {
  public status: string;
  constructor(public message: string, public statusCode: number) {
    super(message);

    this.status = this.statusCode.toString().startsWith('4') ? 'fail' : 'error';

    Error.captureStackTrace(this, this.constructor);
  }
}

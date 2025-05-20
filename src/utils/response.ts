import { Response } from "express";

export class ResponseHandler {
  private data: any;
  private message: string;
  private statusCode: number;
  private meta: any | null;
  private status: string;
  constructor(
    data: any,
    message: string,
    statusCode: number,
    meta: any = null,
    status: string
  ) {
    this.data = data;
    this.message = message;
    this.statusCode = statusCode;
    this.meta = meta;
    this.status = status;
  }
  public send(res: Response): void {
    const responseBody: any = {
      statusCode: this.statusCode,
      message: this.message,
      data: this.data,
      status: this.status,
    };
    if (this.meta) {
      responseBody.meta = this.meta;
    }
    res.status(this.statusCode).json(responseBody);
  }
}

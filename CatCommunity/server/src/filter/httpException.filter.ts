import { ArgumentsHost, ExceptionFilter, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();
    const statusCode = res.statusCode;
    console.log(exception);

    type errorObject = {
      statusCode: number;
      message: string | string[];
      error: string;
    };

    const exceptionObj: any | string = exception.getResponse();
    console.log(exceptionObj);

    res.status(statusCode).json({
      statusCode: statusCode,
      timeStamp: new Date().toISOString(),
      path: req.url,
      success: false,
      message: exceptionObj.message,
    });
  }
}

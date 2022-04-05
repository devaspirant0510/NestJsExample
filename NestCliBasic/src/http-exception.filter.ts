import {ArgumentsHost, ExceptionFilter, HttpException} from "@nestjs/common";
import {Request, Response} from "express"

export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost): any {
        const ctx = host.switchToHttp();
        const res = ctx.getResponse<Response>()
        const req = ctx.getRequest<Request>()
        const resStatusCode = exception.getStatus();
        console.log(exception.message)
        console.log(exception.getResponse())
        res.status(resStatusCode).json({
            statusCode: resStatusCode,
            timeStamp: new Date().toISOString(),
            path: req.url,
            success: false,
            message: exception.message
        })
    }
}

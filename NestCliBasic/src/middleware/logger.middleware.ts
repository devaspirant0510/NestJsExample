import {Injectable, Logger, NestMiddleware} from '@nestjs/common';
import {Request,Response,NextFunction} from "express";
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger("HTTP")
  use(req: Request, res: Response, next: NextFunction) {
    this.logger.log(`Request === user-agent : ${req.headers["user-agent"]} Method : ${req.method} Url : ${req.baseUrl}${req.url} IP: ${req.ip}`);
    res.on("finish",()=>{
      this.logger.log(`Response === ${res.statusCode}`)
    })
    next();
  }
}

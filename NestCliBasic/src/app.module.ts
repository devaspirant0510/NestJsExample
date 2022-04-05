import {HttpException, MiddlewareConsumer, Module, NestModule, UseFilters} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import {CatsService} from "./cats/cats.service";
import { UsersModule } from './users/users.module';
import {LoggerMiddleware} from "./middleware/logger.middleware";
import {HttpExceptionFilter} from "./http-exception.filter";

// AppModule 에서 AppService 를 AppController 로 주입
// import 로 불러온 모듈에서 export 한 서비스를 사용가능
// 모듈은 기본적으로 공급자를 캡술화
@Module({
  imports: [CatsModule, UsersModule],
  controllers: [AppController],
  providers: [AppService,CatsService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes("*")
  }
}

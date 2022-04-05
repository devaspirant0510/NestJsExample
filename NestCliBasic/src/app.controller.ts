import {
    Controller,
    Get,
    Req,
    Res,
    Body,
    Param,
    Post,
    HttpCode,
    Redirect,
    UseFilters,
    HttpException
} from '@nestjs/common';
import {AppService} from './app.service';
import {Request, Response} from "express";
import {CatsService} from "./cats/cats.service";
import {HttpExceptionFilter} from "./http-exception.filter";

@Controller()
// 컨트롤러에 UserFilter 를 쓰면 특정 컨트롤러에만 적용
// @UseFilters(HttpExceptionFilter)
export class AppController {
    constructor(private readonly appService: AppService, private readonly catService: CatsService) {
    }

    @Get("/")
    // 특정 라우터에만 exception 필터
    // @UseFilters(HttpExceptionFilter)
    async getHello(@Req() req, @Body() body, @Param() param) {
        // throw new HttpException("error", 404);
        return this.appService.getHello();
    }

    @Post()
    postHello(@Res() res): string {
        return res.send("aa");
    }

    @Get("/nest")
    getNest(): string {
        throw new HttpException("error", 404);
        return this.catService.test();
    }

    @Get("/aaa")
    getTest(): string {
        return this.appService.getHello();
    }

    @Get('/cat/:id/:name')
    getCat(
        @Req() req: Request,
        @Body() body,
        @Param() params: { id: string, name: string }): string {
        console.log(req);
        console.log(body)
        console.log(params.id)
        return this.appService.getHello();

    }
}

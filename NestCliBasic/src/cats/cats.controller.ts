import {
    Controller,
    Delete,
    Get,
    HttpException,
    Param,
    ParseIntPipe,
    Post,
    Put,
    UseFilters,
    UseInterceptors
} from '@nestjs/common';
import {CatsService} from "./cats.service";
import {HttpExceptionFilter} from "../http-exception.filter";
import {PositiveIntPipe} from "../pipe/positiveInt.pipe";
import {SuccessInterceptor} from "../interceptor/success.interceptor";

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
export class CatsController {
    constructor(private readonly catsService:CatsService) {}

    @Get()
    getAllCat(){
        throw new HttpException({message:"api is broken",success:false},411)
        return "get all cat";
    }

    @Get("/:id")
    getOneCat(@Param("id",ParseIntPipe,PositiveIntPipe) param){
        console.log(typeof param)
        if(typeof param === "number"){
            return `you cat is ${param}`
        }
        throw new HttpException("id 는 int 여야합니다.",401)
    }

    @Post()
    createCat(){
        return "create cat";
    }

    @Put()
    updateCat(){
        return "update cat";
    }

    @Delete()
    deleteCat(){
        return "delete cat"
    }
}

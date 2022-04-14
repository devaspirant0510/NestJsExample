import {
  Body,
  Controller,
  Get,
  HttpException,
  Post,
  UseFilters,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatRequestDto } from '../../data/dto/CatRequest.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CatReadonlyDto } from '../../data/dto/CatReadonly.dto';
import { Test } from '../../test/test';
import { CatRepository } from '../../repository/cat.repository';
import { HttpExceptionFilter } from '../../filter/httpException.filter';
import { LoginRequestDto } from '../../data/dto/loginRequest.dto';
import { AuthService } from '../auth/auth.service';

@Controller('cats')
@UseFilters(HttpExceptionFilter)
export class CatsController {
  constructor(
    private readonly catService: CatsService,
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({
    summary: '고양이 전체 조회',
  })
  @Get()
  async getAllCat(): Promise<string> {
    return 'all cat';
  }

  @ApiOperation({
    summary: '고양이로그인',
  })
  @Post('/login')
  async login(@Body() body: LoginRequestDto) {
    return this.authService.jwtLogin(body);
  }

  @ApiOperation({
    summary: '고양이 회원 가입',
  })
  @ApiResponse({
    status: 500,
    description: 'server error',
  })
  @ApiResponse({
    status: 200,
    description: 'success',
    type: CatReadonlyDto,
  })
  @Post()
  async register(@Body() body: CatRequestDto) {
    const result = await this.catService.signUp(body);
    return result;
  }
}

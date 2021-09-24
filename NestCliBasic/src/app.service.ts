import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  getNest():string{
    return "<h1>Nest is God</h1><h2>Typescript is God</h2>"
  }
}


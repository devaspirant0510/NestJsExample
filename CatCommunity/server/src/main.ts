import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HttpExceptionFilter } from './filter/httpException.filter';
import { Cat } from './data/schema/cats.schema';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 3001
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors({
    origin:['http://127.0.0.1:3000',"http://localhost:3000"],
    credentials:true
  })
  const config = new DocumentBuilder()
    .setTitle('Cats SNS')
    .setDescription('CAT SNS Service API Document')
    .setVersion('1.0.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config,{extraModels:[Cat]});
  SwaggerModule.setup('api', app, document);
  await app.listen(PORT);
}
bootstrap();

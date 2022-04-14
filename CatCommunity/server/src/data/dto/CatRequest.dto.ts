import { IsEmail, IsString, IsNotEmpty, IsInt, IsIn } from 'class-validator';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { Cat } from '../schema/cats.schema';

export class CatRequestDto extends PickType(Cat, [
  'email',
  'name',
  'age',
  'password',
] as const) {}

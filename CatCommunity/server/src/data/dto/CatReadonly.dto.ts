import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsEmail, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { Cat } from '../schema/cats.schema';

export class CatReadonlyDto extends PickType(Cat,['email','name','age'] as const){}

import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IsEmail, IsNotEmpty, IsString, IsInt, IsIn } from 'class-validator';
import { ApiProperty, ApiExtraModels } from '@nestjs/swagger';

const options: SchemaOptions = {
  timestamps: true,
};
export type CatDocument = Cat & Document;

@Schema(options)
export class Cat {
  @ApiProperty({
    example: 'test@naver.com',
    description: 'email',
    required: true,
  })
  @Prop({
    required: true,
    unique: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'nestCat',
    description: 'name',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: '15',
    description: 'age',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  age: number;

  @ApiProperty({
    example: '1234!@abc',
    description: 'password',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({
    example: 'https://www.nest-cat-sns/image/12043224',
    description: 'imageURL',
    required: false,
  })
  @Prop({
    required: false,
  })
  imageURL: string;

  readonly readonlyData: { name: string; age: number; email: string };
}

export const CatSchema = SchemaFactory.createForClass(Cat);

CatSchema.virtual('readonlyData').get(function (this: Cat) {
  return {
    name: this.name,
    age: this.age,
    email: this.email,
  };
});
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cat } from '../data/schema/cats.schema';
import { Model } from 'mongoose';

@Injectable()
export class CatRepository {
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}

  async isExistEmail(email: string) {
    const result = await this.catModel.exists({ email });
    console.log(result);
    return result;
  }

  async createCat(
    age: number,
    email: string,
    name: string,
    password: string,
  ): Promise<Cat> {
    return await this.catModel.create({
      age,
      email,
      name,
      password,
    });
  }

  async findByCatEmail(email: string): Promise<Cat | null> {
    const isCatExist = await this.catModel.findOne({ email });
    console.log(isCatExist);
    if (isCatExist) {
      return isCatExist;
    } else {
      return null;
    }
  }
}

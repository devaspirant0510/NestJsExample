import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cat } from '../../data/schema/cats.schema';
import { CatRequestDto } from '../../data/dto/CatRequest.dto';
import * as bcrypt from 'bcrypt';
import { CatRepository } from '../../repository/cat.repository';

@Injectable()
export class CatsService {
  constructor(private readonly repository: CatRepository) {}

  async signUp(body: CatRequestDto) {
    const { name, age, password, email } = body;
    // 이메일이 db 에 있는지 확인 있다면 정보리턴 없다면 null
    const isExistEmail = await this.repository.isExistEmail(email);
    if (isExistEmail) {
      throw new UnauthorizedException('해당 이메일은 이미 사용중입니다.');
    } else {
      const hashPassword = await bcrypt.hash(password, 10);
      const createCat = await this.repository.createCat(
        age,
        email,
        name,
        hashPassword,
      );
      console.log(createCat);
      console.log('readOny', createCat.readonlyData);
      return createCat.readonlyData;
    }
  }
}

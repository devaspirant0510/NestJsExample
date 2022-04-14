import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CatRepository } from '../../repository/cat.repository';
import { LoginRequestDto } from '../../data/dto/loginRequest.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly repository: CatRepository,
    private readonly jwtService: JwtService,
  ) {}

  async jwtLogin(data: LoginRequestDto) {
    const { email, password } = data;
    const isEmailExist = await this.repository.findByCatEmail(email);
    if (!isEmailExist) {
      throw new UnauthorizedException('이메일과 비빌먼호를 확인해주세요');
    }
    console.log(password, isEmailExist.password);
    const isPasswordValidate = await bcrypt.compare(
      password,
      isEmailExist.password,
    );
    console.log(isPasswordValidate);
    if (!isPasswordValidate) {
      throw new UnauthorizedException('이메일과 비빌먼호를 확인해주세요');
    }
    const payload = { email: email, sub: isEmailExist.email };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}

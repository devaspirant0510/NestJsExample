import { Test, TestingModule } from '@nestjs/testing';
import { CatsService } from './cats.service';
import { getModelToken } from '@nestjs/mongoose';
import { Cat } from '../../data/schema/cats.schema';

describe('CatsService', () => {
  let service: CatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CatsService,
        {
          provide: getModelToken(Cat.name),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<CatsService>(CatsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('기본 회원가입 요청', () => {
    expect(
      service.signUp({
        age: 3,
        email: 'asd@madfs.com',
        password: 'asdf',
        name: 'ssse',
      }),
    )
      .resolves.toStrictEqual({ name: 332 })
      .catch();
  });
});

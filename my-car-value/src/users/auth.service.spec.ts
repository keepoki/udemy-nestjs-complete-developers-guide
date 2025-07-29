import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { UserEntity } from './user.entity';
import { BadRequestException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    // 사용자 서비스의 가짜 사본을 만듭니다
    fakeUsersService = {
      find: () => Promise.resolve([]),
      create: (email: string, password: string) =>
        Promise.resolve({ id: 1, email, password } as UserEntity),
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService, // AuthService -> UsersService
        {
          provide: UsersService, // UserService를 요청할 때
          useValue: fakeUsersService, // 이 값을 사용한다는 의미이다.
        },
      ],
    }).compile();

    // 모든 인증 테스트 모듈에 이 서비스를 받을 것이다.
    service = module.get(AuthService);
  });

  it('can create an instance of auth service', () => {
    // AuthService는 fakeUsersService를 통해 테스트한다.
    expect(service).toBeDefined();
  });

  it('create a user with salted and hashed password', async () => {
    const user = await service.signup('asdf@asdf.com', 'asdf');

    expect(user.password).not.toEqual('asdf');
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('throws an error if user signs up with email that is in use', async () => {
    fakeUsersService.find = () =>
      Promise.resolve([{ id: 1, email: 'a', password: '1' } as UserEntity]);
    await expect(service.signup('asdf@asdf.com', 'asdf')).rejects.toThrow(
      BadRequestException,
    );
  });
});

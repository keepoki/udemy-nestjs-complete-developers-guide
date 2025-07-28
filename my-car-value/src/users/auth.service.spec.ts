import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { UserEntity } from './user.entity';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    // 사용자 서비스의 가짜 사본을 만듭니다
    const fakeUsersService: Partial<UsersService> = {
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
});

import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';

it('can create an instance of auth service', async () => {
  // 사용자 서비스의 가짜 사본을 만듭니다
  const fakeUsersService = {
    find: () => Promise.resolve([]),
    create: (email: string, password: string) =>
      Promise.resolve({ id: 1, email, password }),
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

  const service = module.get(AuthService);

  // AuthService는 fakeUsersService를 통해 테스트한다.
  expect(service).toBeDefined();
});

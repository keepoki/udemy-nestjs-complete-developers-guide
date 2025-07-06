import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(email: string, password: string) {
    // 이메일이 사용 중인지 확인하십시오
    const users = await this.usersService.find(email);
    if (users.length) {
      throw new BadRequestException('email in use');
    }

    // 사용자 비밀번호 해시

    // 새 사용자를 만들고 저장하십시오

    // return the user
  }

  signin() {

  }
}

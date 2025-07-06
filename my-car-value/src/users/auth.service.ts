import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

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
    // Salt 생성
    const salt = randomBytes(8).toString('hex');

    // 소금과 암호를 함께 해시로 변환
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    // 해시 결과와 소금을 합치시오
    const result = salt + '.' + hash.toString('hex');

    // 새 사용자를 만들고 저장하십시오

    // return the user
  }

  signin() {

  }
}

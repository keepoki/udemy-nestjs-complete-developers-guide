import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';
import { UserDto } from 'src/users/dtos/user.dto';

export class SerializeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    return handler.handle().pipe(
      map((data: any) => {
        return plainToClass(UserDto, data, {
          // 일반 값을 클래스로 변환 할 때 외부 속성이 값에서 제외되어야하는지 여부를 나타냅니다.
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}

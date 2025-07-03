import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';
export class SerializeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    // 요청 핸들러가 요청을 처리하기 전에 무언가를 실행합니다.
    console.log('나는 핸들러 전에 실행됩니다.', context);

    return handler.handle().pipe(
      map((data: any) => {
        // 응답이 발송되기 전에 무언가를 실행하십시오
        console.log('응답이 발송되기 전에 실행 중입니다.', data);
      }),
    );
  }
}

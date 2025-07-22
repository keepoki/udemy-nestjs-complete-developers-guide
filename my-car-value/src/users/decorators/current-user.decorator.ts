import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserEntity } from '../user.entity';

export const CurrentUser = createParamDecorator(
  // context: 요청 핸들러
  (data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.currentUser as UserEntity;
  },
);

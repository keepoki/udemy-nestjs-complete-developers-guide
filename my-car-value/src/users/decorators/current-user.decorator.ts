import {
  createParamDecorator,
  ExecutionContext
} from '@nestjs/common';


export const CurrentUser = createParamDecorator(
  // context: 요청 핸들러
  (data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    console.log(request.session.userId);
    return 'hi there!';
  },
);

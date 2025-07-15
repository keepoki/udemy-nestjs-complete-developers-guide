import {
  createParamDecorator,
  ExecutionContext
} from '@nestjs/common';


export const CurrentUser = createParamDecorator(
  // context: 요청 핸들러
  (data: any, context: ExecutionContext) => {
    return 'hi there!';
  },
);

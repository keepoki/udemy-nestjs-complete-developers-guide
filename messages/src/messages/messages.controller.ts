import { Body, Controller, Get, Param, Post, NotFoundException } from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  messagesServices: MessagesService;

  constructor() {
    // 실제 앱에서 이렇게 하지 마세요.
    // 의존성 주입을 사용하세요.
    this.messagesServices = new MessagesService();
  }

  @Get()
  listMessages() {
    return this.messagesServices.findAll();
  }

  @Post()
  createMessage(@Body() body: CreateMessageDto) {
    return this.messagesServices.create(body.content);
  }

  @Get('/:id')
  async getMessage(@Param('id') id: string) {
    const message = await this.messagesServices.findOne(id);

    if (!message) {
      throw new NotFoundException('message not found.');
    }

    return message;
  }
}

import { Body, Controller, Get, Param, Post, NotFoundException } from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(public messagesServices: MessagesService) {}

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

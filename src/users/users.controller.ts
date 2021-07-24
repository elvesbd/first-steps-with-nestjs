import { Get, OnModuleInit } from '@nestjs/common';
import { Body, Controller, Post } from '@nestjs/common';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';
import { ApiBody } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { UserEntity } from './databases/user.entity';
import { UserDto } from './dto/user.dto';

@Controller('users')
export class UsersController implements OnModuleInit {
  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'user',
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'user-consumer',
        allowAutoTopicCreation: true,
      },
    },
  })
  private client: ClientKafka;
  async onModuleInit() {
    const requestPatters = ['find-all-user', 'create-user'];

    requestPatters.forEach(async (pattern) => {
      this.client.subscribeToResponseOf(pattern);
      await this.client.connect();
    });
  }

  @Get()
  index(): Observable<UserEntity[]> {
    return this.client.send('find-all-user', {});
  }

  @Post()
  @ApiBody({ type: UserDto })
  create(@Body() user: UserDto): Observable<UserEntity> {
    return this.client.send('create-user', user);
  }
}

import { Get } from '@nestjs/common';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';
import { User } from './interfaces/user.interface';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiBody({ type: UserDto })
  create(@Body() user: UserDto): User {
    return this.usersService.create(user);
  }

  @Get()
  index(): User[] {
    return this.usersService.findAll();
  }
}

import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './databases/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async create(user: User): Promise<UserEntity> {
    return await this.userRepository.save(user);
  }
}

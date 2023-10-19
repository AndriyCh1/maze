import { Injectable, NotFoundException } from '@nestjs/common';
import { ICreateUser } from '../common/types/user.types';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(data: ICreateUser): Promise<User> {
    const { username } = data;

    return await this.userRepository.save(
      this.userRepository.create({ username }),
    );
  }

  async findOneById(id: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async deleteOneById(id: string) {
    await this.userRepository.delete({ id });
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { ICreateUser } from '../common/types/user.types';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { RoomUser } from '../room/entities/room-user.entity';
import { Room } from '../room/entities/room.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(RoomUser)
    private readonly roomUserRepository: Repository<RoomUser>,
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
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

  async getUserRooms(id: string) {
    const userRooms = await this.roomUserRepository.find({
      where: { user: { id } },
      relations: { room: true },
    });

    const myRoomsIds = userRooms.map((userRoom) => userRoom.room.id);

    const userRoomsAndOpponents = await this.roomRepository.find({
      where: { id: In(myRoomsIds) },
      relations: { roomUsers: { user: true } },
      order: { roomUsers: { room: { timestamp: 'desc' } } },
    });

    return userRoomsAndOpponents;
  }
}

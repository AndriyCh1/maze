import { Injectable, NotFoundException } from '@nestjs/common';
import { ICreateRoom } from '../common/types/room.types';
import { Room } from './entities/room.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { MazeService } from '../maze/maze.service';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly mazeService: MazeService,
  ) {}

  async create(data: ICreateRoom): Promise<Room> {
    const { ownerId } = data;

    const maze = await this.mazeService.generateMaze();

    return await this.roomRepository.save(
      this.roomRepository.create({ owner: { id: ownerId }, maze }),
    );
  }

  async addUserToRoom(userId: string, roomId: string): Promise<void> {
    const room = await this.roomRepository.findOne({
      where: { id: roomId },
      relations: ['users'],
    });

    if (!room) {
      throw new NotFoundException(`Room with id ${roomId} not found`);
    }

    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    room.users.push(user);

    await this.roomRepository.save(room);
  }

  async findOneById(id: string): Promise<Room | undefined> {
    const room = await this.roomRepository.findOne({
      where: { id },
      relations: { users: true },
    });

    if (!room) {
      throw new NotFoundException(`Room with id ${id} not found`);
    }

    return room;
  }

  async findAll(): Promise<Room[]> {
    return await this.roomRepository.find();
  }

  async deleteOneById(id: string): Promise<void> {
    await this.roomRepository.delete({ id });
  }

  async findOneWithMaze(id: string): Promise<Room | undefined> {
    return await this.roomRepository.findOne({
      where: { id },
      relations: { maze: true },
    });
  }
}

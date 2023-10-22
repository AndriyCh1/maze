import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Action } from './entities/action.entity';
import { ISaveAction } from '../common/types';

@Injectable()
export class ActionService {
  constructor(
    @InjectRepository(Action)
    private readonly actionRepository: Repository<Action>,
  ) {}

  async create(data: ISaveAction): Promise<Action> {
    const { userId, command, roomId, positionX, positionY, isWall } = data;

    const actionInstance = this.actionRepository.create({
      command,
      room: { id: roomId },
      user: { id: userId },
      positionX,
      positionY,
      isWall,
    });

    return this.actionRepository.save(actionInstance);
  }

  async findAll(): Promise<Action[]> {
    return this.actionRepository.find();
  }

  async findOne(id: string): Promise<Action | undefined> {
    return this.actionRepository.findOne({ where: { id } });
  }

  async findAllByRoomId(id: string): Promise<Action[]> {
    return this.actionRepository.find({ where: { room: { id } } });
  }

  async findAllByRoomAndUserId(
    roomId: string,
    userId: string,
  ): Promise<Action[]> {
    return this.actionRepository.find({
      where: { room: { id: roomId }, user: { id: userId } },
    });
  }
}

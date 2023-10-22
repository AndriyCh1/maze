import {
  Injectable,
  NotFoundException,
  BadGatewayException,
} from '@nestjs/common';
import {
  ICreateRoom,
  IReplay,
  IRoomExtended,
  IRoomReplay,
} from '../common/types/room.types';
import { Room } from './entities/room.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { MazeService } from '../maze/maze.service';
import { RoomUser } from './entities/room-user.entity';
import { Maze as MazeModel } from '../maze/models/maze.model';
import { Action } from './entities/action.entity';
import { commandToDirection } from '../common/utils/convert-command.util';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
    @InjectRepository(RoomUser)
    private readonly roomUserRepository: Repository<RoomUser>,
    @InjectRepository(Action)
    private readonly actionRepository: Repository<Action>,
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

  async addUserToRoom(userId: string, roomId: string): Promise<IRoomExtended> {
    const room = await this.roomRepository.findOne({
      where: { id: roomId },
      relations: { maze: true },
    });

    if (!room) {
      throw new NotFoundException(`Room with id ${roomId} not found`);
    }

    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    const mazeJson = JSON.parse(room.maze.json);
    const mazeModel = MazeModel.fromJSON(mazeJson);
    const userInitialCell = mazeModel.findPassCell();

    if (!userInitialCell) {
      throw new BadGatewayException(`There maze was not properly created`);
    }

    const roomUserInstance = this.roomUserRepository.create({
      user: { id: userId },
      room: { id: roomId },
      initialPositionX: userInitialCell.x,
      initialPositionY: userInitialCell.y,
    });

    await this.roomUserRepository.insert(roomUserInstance);

    const getRoomExtendedQB = this.roomRepository
      .createQueryBuilder('room')
      .innerJoinAndMapOne(
        'room.roomUser',
        RoomUser,
        'roomUser',
        'roomUser.roomId = room.id',
      )
      .where('roomUser.userId = :userId', { userId })
      .andWhere('roomUser.roomId = :roomId', { roomId });

    return (await getRoomExtendedQB.getOne()) as IRoomExtended;
  }

  async findOneById(id: string): Promise<Room | undefined> {
    const room = await this.roomRepository.findOne({
      where: { id },
      relations: { roomUsers: true },
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

  async getReplay(roomId: string, userId: string): Promise<IReplay> {
    const userRoom = await this.roomRepository
      .createQueryBuilder('room')
      .innerJoinAndMapOne(
        'room.roomUser',
        RoomUser,
        'roomUser',
        'roomUser.roomId = room.id',
      )
      .innerJoinAndSelect('room.maze', 'maze')
      .where('roomUser.userId = :userId', { userId })
      .andWhere('roomUser.roomId = :roomId', { roomId })
      .getOne();

    const actions = await this.actionRepository.find({
      where: { user: { id: userId }, room: { id: roomId } },
      order: { sequenceId: 'ASC' },
    });

    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    const mazeConfig = {
      width: userRoom.maze.width,
      height: userRoom.maze.height,
    };

    delete userRoom.maze;

    const mappedActions = actions.map((action) => ({
      ...action,
      direction: commandToDirection(action.command),
    }));

    const response = {
      room: { ...userRoom, mazeConfig } as unknown as IRoomReplay,
      actions: mappedActions,
      user,
    };

    return response;
  }

  async updateWinStatus(
    roomId: string,
    userId: string,
    winStatus: boolean,
  ): Promise<void> {
    await this.roomUserRepository.update(
      {
        user: { id: userId },
        room: { id: roomId },
      },
      { winStatus },
    );
  }
}

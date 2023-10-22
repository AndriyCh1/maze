import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { User } from '../user/entities/user.entity';
import { MazeModule } from '../maze/maze.module';
import { ActionService } from './action.service';
import { Action } from './entities/action.entity';
import { RoomUser } from './entities/room-user.entity';
import { RoomController } from './room.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Room, User, Action, RoomUser]),
    MazeModule,
  ],
  providers: [RoomService, ActionService],
  exports: [RoomService, ActionService],
  controllers: [RoomController],
})
export class RoomModule {}

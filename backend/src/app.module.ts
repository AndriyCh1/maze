import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { RoomModule } from './room/room.module';
import { Room } from './room/entities/room.entity';
import { GameModule } from './game/game.module';
import { MazeModule } from './maze/maze.module';
import { Maze as MazeEntity } from './maze/entities/maze.entity';
import { Action } from './room/entities/action.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Room, MazeEntity, Action],
      synchronize: true,
    }),
    UserModule,
    RoomModule,
    GameModule,
    MazeModule,
  ],
  controllers: [],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { MazeService } from './maze.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Maze as MazeEntity } from './entities/maze.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MazeEntity])],
  providers: [MazeService],
  exports: [MazeService],
})
export class MazeModule {}

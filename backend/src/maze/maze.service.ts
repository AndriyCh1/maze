import { Injectable } from '@nestjs/common';
import { maze5x5, maze10x10 } from './templates';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { Maze as MazeEntity } from './entities/maze.entity';

@Injectable()
export class MazeService {
  constructor(
    @InjectRepository(MazeEntity)
    private readonly mazeRepository: Repository<MazeEntity>,
  ) {}

  public async generateMaze(): Promise<MazeEntity> {
    const mazes = [maze5x5, maze10x10];
    const randomIndex = Math.floor(Math.random() * mazes.length);
    const pickedMaze = mazes[randomIndex];
    const stringifiedMaze = JSON.stringify(pickedMaze.maze.toJSON());

    return await this.mazeRepository.save(
      this.mazeRepository.create({
        width: pickedMaze.width,
        height: pickedMaze.height,
        json: stringifiedMaze,
      }),
    );
  }

  findOne(
    fields: FindOptionsWhere<MazeEntity>,
  ): Promise<MazeEntity | undefined> {
    return this.mazeRepository.findOne({
      where: fields,
    });
  }
}

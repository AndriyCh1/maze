import { Injectable } from '@nestjs/common';
import { maze5x5 } from './maze-templates';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { Maze as MazeEntity } from './entities/maze.entity';

@Injectable()
export class MazeService {
  constructor(
    @InjectRepository(MazeEntity)
    private readonly mazeRepository: Repository<MazeEntity>,
  ) {}

  public async generateMaze(width = 5, height = 5): Promise<MazeEntity> {
    // TODO: implement algorithm
    const stringifiedMaze = JSON.stringify(maze5x5.toJSON());

    return await this.mazeRepository.save(
      this.mazeRepository.create({
        width,
        height,
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

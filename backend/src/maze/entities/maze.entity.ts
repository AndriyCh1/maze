import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Maze {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  height: number;

  @Column()
  width: number;

  @Column()
  json: string;
}

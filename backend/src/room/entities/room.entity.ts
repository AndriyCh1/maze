import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Maze as MazeEntity } from '../../maze/entities/maze.entity';
import { Action } from './action.entity';

@Entity()
export class Room {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true, default: 2 })
  maxPlayers?: number;

  @ManyToOne(() => User, (user) => user.rooms)
  owner: User;

  @ManyToMany(() => User)
  @JoinTable()
  users: User[];

  @OneToOne(() => MazeEntity)
  @JoinColumn()
  maze: MazeEntity;

  @OneToMany(() => Action, (action: Action) => action.room)
  actions: Action[];

  @CreateDateColumn()
  timestamp: Date;
}

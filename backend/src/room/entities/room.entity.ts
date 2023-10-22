import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Maze as MazeEntity } from '../../maze/entities/maze.entity';
import { Action } from './action.entity';
import { RoomUser } from './room-user.entity';

@Entity()
export class Room {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true, default: 2 })
  maxPlayers?: number;

  @ManyToOne(() => User, (user) => user.rooms)
  owner: User;

  @OneToMany(() => RoomUser, (roomUser) => roomUser.room)
  roomUsers: RoomUser[];

  @OneToOne(() => MazeEntity)
  @JoinColumn()
  maze: MazeEntity;

  @OneToMany(() => Action, (action: Action) => action.room)
  actions: Action[];

  @CreateDateColumn()
  timestamp: Date;
}

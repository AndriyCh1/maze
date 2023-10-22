import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import { Room } from './room.entity';
import { User } from '../../user/entities/user.entity';
import { Command } from '../../common/constants';

@Entity()
export class Action {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: Command })
  command?: Command | null;

  @Column({ type: 'int2' })
  positionX: number;

  @Column({ type: 'int2' })
  positionY: number;

  @Column()
  isWall: boolean;

  @ManyToOne(() => Room, (room: Room) => room.actions)
  room: Room;

  @ManyToOne(() => User, (user: User) => user.actions)
  user: User;

  @PrimaryGeneratedColumn('increment')
  sequenceId: number;
}

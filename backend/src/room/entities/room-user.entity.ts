import { Entity, ManyToOne, PrimaryGeneratedColumn, Column } from 'typeorm';

import { Room } from './room.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
export class RoomUser {
  // Not needed, but required by ORM
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Room, (room: Room) => room.roomUsers)
  room: Room;

  @ManyToOne(() => User, (user: User) => user.roomUsers)
  user: User;

  @Column({ default: false })
  winStatus: boolean;

  @Column({ type: 'int2' })
  initialPositionX: number;

  @Column({ type: 'int2' })
  initialPositionY: number;
}

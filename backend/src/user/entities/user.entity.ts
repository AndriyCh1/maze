import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Action } from '../../room/entities/action.entity';
import { RoomUser } from '../../room/entities/room-user.entity';
import { Room } from '../../room/entities/room.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 20 })
  username: string;

  @OneToMany(() => Room, (room) => room.owner)
  rooms: Room[];

  @OneToMany(() => RoomUser, (roomUser) => roomUser.user)
  roomUsers: RoomUser[];

  @OneToMany(() => Action, (action: Action) => action.user)
  actions: Action[];
}

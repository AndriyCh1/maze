import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Room } from '../../room/entities/room.entity';
import { Action } from '../../room/entities/action.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 20 })
  username: string;

  @OneToMany(() => Room, (room) => room.owner)
  rooms: Room[];

  @OneToMany(() => Action, (action: Action) => action.room)
  actions: Action[];
}

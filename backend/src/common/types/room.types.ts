import { Action } from '../../room/entities/action.entity';
import { RoomUser } from '../../room/entities/room-user.entity';
import { Room } from '../../room/entities/room.entity';
import { User } from '../../user/entities/user.entity';

export interface ICreateRoom {
  ownerId: string;
}

export type IRoomExtended = Room & {
  roomUser: RoomUser;
};

export interface IRoomUser {
  id: string;
  winStatus: boolean;
  initialPositionX: number;
  initialPositionY: number;
  user: User;
}

export interface IPlayedGame {
  id: string;
  timestamp: string;
  roomUsers: IRoomUser[];
}

type IAction = Action & {
  direction: string;
};

export interface IRoomReplay {
  id: string;
  maxPlayers: number;
  timestamp: string;
  roomUser: {
    id: string;
    winStatus: boolean;
    initialPositionX: number;
    initialPositionY: number;
  };
  mazeConfig: {
    width: number;
    height: number;
  };
}

export type IReplay = {
  room: IRoomReplay;
  actions: IAction[];
  user: User;
};

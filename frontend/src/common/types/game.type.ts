import { Direction } from "../../components/maze/models/cell.model";
import { Command } from "../consts";
import { IRoom } from "./room.type";
import { IUser } from "./user.type";

export interface IPlayerPosition {
  x: number;
  y: number;
}

export type IGameState = {
  room: IRoom;
  mazeConfig: {
    width: number;
    height: number;
  };
  playerPosition: IPlayerPosition;
};

export interface IMoveResponse {
  command: Command;
  isWall?: boolean;
  isExit?: boolean;
  position?: IPlayerPosition;
  direction?: Direction;
  moved: boolean;
}

export interface IWinner {
  username: string;
  userId: string;
}

export interface IRoomUser {
  id: string;
  winStatus: boolean;
  initialPositionX: number;
  initialPositionY: number;
  user: IUser;
}

export interface IGameRoom {
  id: string;
  timestamp: string;
  roomUsers: IRoomUser[];
}

export interface IAction {
  id: string;
  command: string;
  positionX: number;
  positionY: number;
  isWall: boolean;
  direction: Direction;
}

export type IRoomReplay = Omit<IRoom, "owner"> & {
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
};

export type IReplay = {
  room: IRoomReplay;
  actions: IAction[];
  user: IUser;
};

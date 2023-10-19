import { Direction } from "../../components/maze/models/cell.model";
import { Command } from "../consts";
import { IRoom } from "./room.type";

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

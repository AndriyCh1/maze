import { Command } from '../constants';

export enum MessageType {
  TEXT = 'text',
  COMMAND = 'command',
}

export interface ISaveAction {
  command: Command;
  roomId: string;
  userId: string;
  positionX: number;
  positionY: number;
  isWall: boolean;
}

export interface ICommand {
  command: Command;
  roomId: string;
}

import { Command } from '../constants';
import { MessageType } from '../types';

const commands = [
  Command.DOWN,
  Command.LEFT,
  Command.RIGHT,
  Command.UP,
] as string[];

export const getMessageType = (message: string): MessageType => {
  const isCommand = commands.includes(message);

  if (isCommand) {
    return MessageType.COMMAND;
  }

  return MessageType.TEXT;
};

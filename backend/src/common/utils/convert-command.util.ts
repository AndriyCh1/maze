import { Direction } from '../../maze/models/cell.model';
import { Command } from '../constants';

export const commandToDirection = (command: Command): Direction => {
  const mapper: { [key in Command]: Direction } = {
    [Command.UP]: 'top',
    [Command.RIGHT]: 'right',
    [Command.DOWN]: 'bottom',
    [Command.LEFT]: 'left',
  };

  return mapper[command];
};

export const commandToWay = (command: Command): string => {
  const mapper: { [key in Command]: string } = {
    [Command.UP]: 'up',
    [Command.RIGHT]: 'right',
    [Command.DOWN]: 'down',
    [Command.LEFT]: 'left',
  };

  return mapper[command];
};

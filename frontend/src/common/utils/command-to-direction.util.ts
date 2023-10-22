import { Direction } from "../../components/maze/models/cell.model";
import { Command } from "../consts";

export const commandToDirection = (command: Command): Direction => {
  const mapper: { [key in Command]: Direction } = {
    [Command.UP]: "top",
    [Command.RIGHT]: "right",
    [Command.DOWN]: "bottom",
    [Command.LEFT]: "left",
  };

  return mapper[command];
};

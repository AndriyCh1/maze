import { Direction } from "readline";
import { Cell } from "./cell.model";

export interface IPosition {
  x: number;
  y: number;
}

export class Player {
  cell: Cell;

  constructor(cell: Cell) {
    this.cell = cell;
    this.cell.player = true;
  }

  move(direction: Direction) {}
}

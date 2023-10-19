import { Cell, Direction } from "./cell.model";
import { Player } from "./player.model";

export interface Position {
  x: number;
  y: number;
}

export class Maze {
  width: number;
  height: number;
  cells: Cell[];

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.cells = [];
    this.initCells();
  }

  private initCells() {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        this.cells.push(new Cell(x, y));
      }
    }
  }

  getCell(position: Position): Cell | undefined {
    return this.cells.find(
      (cell) => cell.x === position.x && cell.y === position.y
    );
  }

  private resetPlayerPosition() {
    this.cells.forEach((cell) => {
      cell.player = false;
    });
  }

  setPlayerPosition(position: Position) {
    this.resetPlayerPosition();

    const cellToPlace = this.getCell(position);

    if (cellToPlace) {
      cellToPlace.visited = true;
      new Player(cellToPlace);
    }
  }

  getNewPlayerPosition(position: Position, direction: Direction) {
    this.resetPlayerPosition();
    const newPosition = { ...position };

    if (direction === "top" && position.y !== 0) {
      newPosition.y -= 1;
    }

    if (direction === "right" && position.x + 1 !== this.width) {
      newPosition.x += 1;
    }

    if (direction === "bottom" && position.y + 1 !== this.height) {
      newPosition.y += 1;
    }

    if (direction === "left" && position.x !== 0) {
      newPosition.x -= 1;
    }

    return newPosition;
  }

  getCopy(): Maze {
    const newMaze = new Maze(this.width, this.height);
    newMaze.cells = this.cells;

    return newMaze;
  }
}

import { Cell, Direction } from './cell.model';

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

  private mapCellWallsToArray = (walls: Map<Direction, boolean>) => {
    const top = walls.get('top') ? 1 : 0;
    const right = walls.get('right') ? 1 : 0;
    const bottom = walls.get('bottom') ? 1 : 0;
    const left = walls.get('left') ? 1 : 0;

    return [top, right, bottom, left];
  };

  private mapWallIndexToDirection = (index: number): Direction => {
    const mapper: { [key: number]: string } = {
      0: 'top',
      1: 'right',
      2: 'bottom',
      3: 'left',
    };

    return mapper[index] as Direction;
  };

  toJSON(): Record<string, any> {
    return {
      width: this.width,
      height: this.height,
      cells: this.cells.map((cell) => ({
        x: cell.x,
        y: cell.y,
        walls: this.mapCellWallsToArray(cell.walls),
      })),
    };
  }

  static fromJSON(json: Record<string, any>): Maze {
    const maze = new Maze(json.width, json.height);

    maze.cells = json.cells.map((cellData: Record<string, any>) => {
      const cell = new Cell(cellData.x, cellData.y);

      cellData.walls.forEach((wall: number, index: number) => {
        if (wall === 1) {
          cell.setWall(maze.mapWallIndexToDirection(index));
        }
      });

      Object.entries(cellData.walls).forEach(([direction, hasWall]) => {
        if (hasWall) {
          cell.setWall(direction as Direction);
        }
      });

      return cell;
    });

    return maze;
  }

  getCell(position: Position): Cell | undefined {
    return this.cells.find(
      (cell) => cell.x === position.x && cell.y === position.y,
    );
  }

  isWallInDirection(cell: Cell, direction: Direction) {
    return cell.hasWall(direction);
  }

  isExitInDirection(cell: Cell, direction: Direction) {
    const cellX = cell.x;
    const cellY = cell.y;
    const mazeWidth = this.width;
    const mazeHeight = this.height;

    const isWall = this.isWallInDirection(cell, direction);

    if (isWall) {
      return false;
    }

    if (direction === 'top' && cellY === 0) {
      return true;
    }

    if (direction === 'right' && cellX + 1 === mazeWidth) {
      return true;
    }

    if (direction === 'bottom' && cellY + 1 === mazeHeight) {
      return true;
    }
    if (direction === 'left' && cellX === 0) {
      return true;
    }
  }

  getRelativePosition(position: Position, direction: Direction) {
    const newPosition = { ...position };

    if (direction === 'top' && position.y !== 0) {
      newPosition.y -= 1;
    }

    if (direction === 'right' && position.x + 1 !== this.width) {
      newPosition.x += 1;
    }

    if (direction === 'bottom' && position.y + 1 !== this.height) {
      newPosition.y += 1;
    }

    if (direction === 'left' && position.x !== 0) {
      newPosition.x -= 1;
    }

    return newPosition;
  }
}

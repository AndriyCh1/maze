export type Direction = "top" | "right" | "bottom" | "left";
export type Walls = Map<Direction, boolean>;

export interface ICell {
  x: number;
  y: number;
  walls: Walls;
  player: boolean;
  visited: boolean;
}

export class Cell implements ICell {
  public readonly x: number;
  public readonly y: number;
  public readonly walls: Walls;
  public player: boolean;
  public visited: boolean;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.walls = new Map<Direction, boolean>();
    this.player = false;
    this.visited = false;
    this.initializeWalls();
  }

  private initializeWalls() {
    this.removeAllWalls();
  }

  setAllWalls() {
    this.setWall("top");
    this.setWall("right");
    this.setWall("bottom");
    this.setWall("left");
  }

  removeAllWalls() {
    this.removeWall("top");
    this.removeWall("right");
    this.removeWall("bottom");
    this.removeWall("left");
  }

  setWall(direction: Direction) {
    this.walls.set(direction, true);
  }

  removeWall(direction: Direction) {
    this.walls.set(direction, false);
  }

  hasWall(direction: Direction): boolean {
    return !!this.walls.get(direction);
  }
}

export type Direction = 'top' | 'right' | 'bottom' | 'left';

export class Cell {
  public readonly x: number;
  public readonly y: number;
  public readonly walls: Map<Direction, boolean>;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.walls = new Map<Direction, boolean>();
    this.initializeWalls();
  }

  private initializeWalls() {
    this.removeAllWalls();
  }

  setAllWalls() {
    this.setWall('top');
    this.setWall('right');
    this.setWall('bottom');
    this.setWall('left');
  }

  removeAllWalls() {
    this.removeWall('top');
    this.removeWall('right');
    this.removeWall('bottom');
    this.removeWall('left');
  }

  setWall(direction: Direction) {
    this.walls.set(direction, true);
  }

  removeWall(direction: Direction) {
    this.walls.set(direction, false);
  }

  hasWall(direction: Direction): boolean {
    return this.walls.get(direction);
  }
}

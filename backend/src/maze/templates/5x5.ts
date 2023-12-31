import { Maze } from '../models/maze.model';

const width = 5;
const height = 5;
const maze = new Maze(5, 5);

// Row 1

maze.cells[0].setWall('top');
maze.cells[0].setWall('left');
maze.cells[0].setWall('bottom');
maze.cells[1].setWall('top');
maze.cells[1].setWall('right');
maze.cells[2].setAllWalls();
maze.cells[3].setWall('top');
maze.cells[3].setWall('left');
maze.cells[4].setWall('top');
maze.cells[4].setWall('right');
maze.cells[4].setWall('bottom');

// Row 2
maze.cells[5 + 0].setAllWalls();
maze.cells[5 + 1].setWall('left');
maze.cells[5 + 1].setWall('right');
maze.cells[5 + 2].setAllWalls();
maze.cells[5 + 3].setWall('left');
maze.cells[5 + 3].setWall('right');
maze.cells[5 + 4].setAllWalls();

// Row 3
maze.cells[10 + 0].setWall('top');
maze.cells[10 + 0].setWall('left');
maze.cells[10 + 1].setWall('right');
maze.cells[10 + 1].setWall('bottom');
maze.cells[10 + 2].setAllWalls();
maze.cells[10 + 3].setWall('left');
maze.cells[10 + 3].setWall('bottom');
maze.cells[10 + 4].setWall('top');
maze.cells[10 + 4].setWall('right');

// Row 4
maze.cells[15 + 0].setWall('left');
maze.cells[15 + 0].setWall('right');
maze.cells[15 + 1].setAllWalls();
maze.cells[15 + 2].setAllWalls();
maze.cells[15 + 3].setAllWalls();
maze.cells[15 + 4].setWall('left');
maze.cells[15 + 4].setWall('right');

// Row 5
maze.cells[20 + 0].setWall('left');
maze.cells[20 + 0].setWall('bottom');
maze.cells[20 + 1].setWall('top');
maze.cells[20 + 1].setWall('bottom');
maze.cells[20 + 2].setWall('top');
maze.cells[20 + 2].setWall('bottom');
maze.cells[20 + 3].setWall('top');
maze.cells[20 + 3].setWall('bottom');
maze.cells[20 + 4].setWall('bottom');

const maze5x5 = { maze, width, height };

export { maze5x5 };

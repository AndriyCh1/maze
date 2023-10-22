import { Maze } from './models/maze.model';

const maze5x5 = new Maze(5, 5);

// Row 1

maze5x5.cells[0].setWall('top');
maze5x5.cells[0].setWall('left');
maze5x5.cells[0].setWall('bottom');
maze5x5.cells[1].setWall('top');
maze5x5.cells[1].setWall('right');
maze5x5.cells[2].setAllWalls();
maze5x5.cells[3].setWall('top');
maze5x5.cells[3].setWall('left');
maze5x5.cells[4].setWall('top');
maze5x5.cells[4].setWall('right');
maze5x5.cells[4].setWall('bottom');

// Row 2
maze5x5.cells[5 + 0].setAllWalls();
maze5x5.cells[5 + 1].setWall('left');
maze5x5.cells[5 + 1].setWall('right');
maze5x5.cells[5 + 2].setAllWalls();
maze5x5.cells[5 + 3].setWall('left');
maze5x5.cells[5 + 3].setWall('right');
maze5x5.cells[5 + 4].setAllWalls();

// Row 3
maze5x5.cells[10 + 0].setWall('top');
maze5x5.cells[10 + 0].setWall('left');
maze5x5.cells[10 + 1].setWall('right');
maze5x5.cells[10 + 1].setWall('bottom');
maze5x5.cells[10 + 2].setAllWalls();
maze5x5.cells[10 + 3].setWall('left');
maze5x5.cells[10 + 3].setWall('bottom');
maze5x5.cells[10 + 4].setWall('top');
maze5x5.cells[10 + 4].setWall('right');

// Row 4
maze5x5.cells[15 + 0].setWall('left');
maze5x5.cells[15 + 0].setWall('right');
maze5x5.cells[15 + 1].setAllWalls();
maze5x5.cells[15 + 2].setAllWalls();
maze5x5.cells[15 + 3].setAllWalls();
maze5x5.cells[15 + 4].setWall('left');
maze5x5.cells[15 + 4].setWall('right');

// Row 5
maze5x5.cells[20 + 0].setWall('left');
maze5x5.cells[20 + 0].setWall('bottom');
maze5x5.cells[20 + 1].setWall('top');
maze5x5.cells[20 + 1].setWall('bottom');
maze5x5.cells[20 + 2].setWall('top');
maze5x5.cells[20 + 2].setWall('bottom');
maze5x5.cells[20 + 3].setWall('top');
maze5x5.cells[20 + 3].setWall('bottom');
maze5x5.cells[20 + 4].setWall('bottom');

export { maze5x5 };

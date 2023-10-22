import { Maze } from '../models/maze.model';

const width = 10;
const height = 10;
const maze = new Maze(10, 10);

// Row 1
maze.cells[0].setWall('top');
maze.cells[0].setWall('left');
maze.cells[0].setWall('right');
maze.cells[1].setWall('top');
maze.cells[1].setWall('bottom');
maze.cells[1].setWall('right');
maze.cells[2].setWall('top');
maze.cells[3].setWall('top');
maze.cells[4].setWall('top');
maze.cells[4].setWall('right');
maze.cells[4].setWall('bottom');
maze.cells[5].setWall('top');
maze.cells[6].setWall('top');
maze.cells[7].setWall('top');
maze.cells[8].setWall('top');
maze.cells[9].setWall('top');
maze.cells[9].setWall('right');

// Row 2
maze.cells[10 + 0].setWall('left');
maze.cells[10 + 3].setWall('left');
maze.cells[10 + 6].setWall('left');
maze.cells[10 + 1].setWall('top');
maze.cells[10 + 4].setWall('top');
maze.cells[10 + 6].setWall('top');
maze.cells[10 + 2].setWall('right');
maze.cells[10 + 5].setWall('right');
maze.cells[10 + 9].setWall('right');
maze.cells[10 + 3].setWall('bottom');
maze.cells[10 + 7].setWall('bottom');
maze.cells[10 + 9].setWall('bottom');

// Row 3
maze.cells[20 + 0].setWall('left');
maze.cells[20 + 3].setWall('left');
maze.cells[20 + 6].setWall('left');
maze.cells[20 + 7].setWall('left');
maze.cells[20 + 3].setWall('top');
maze.cells[20 + 7].setWall('top');
maze.cells[20 + 9].setWall('top');
maze.cells[20 + 2].setWall('right');
maze.cells[20 + 5].setWall('right');
maze.cells[20 + 6].setWall('right');
maze.cells[20 + 9].setWall('right');
maze.cells[20 + 1].setWall('bottom');
maze.cells[20 + 5].setWall('bottom');

// Row 4
maze.cells[30 + 0].setWall('left');
maze.cells[30 + 2].setWall('left');
maze.cells[30 + 3].setWall('left');
maze.cells[30 + 4].setWall('left');
maze.cells[30 + 6].setWall('left');
maze.cells[30 + 8].setWall('left');
maze.cells[30 + 1].setWall('top');
maze.cells[30 + 5].setWall('top');
maze.cells[30 + 1].setWall('right');
maze.cells[30 + 3].setWall('right');
maze.cells[30 + 5].setWall('right');
maze.cells[30 + 7].setWall('right');
maze.cells[30 + 9].setWall('right');
maze.cells[30 + 0].setWall('bottom');
maze.cells[30 + 3].setWall('bottom');
maze.cells[30 + 7].setWall('bottom');
maze.cells[30 + 8].setWall('bottom');

// Row 5
maze.cells[40 + 0].setWall('left');
maze.cells[40 + 1].setWall('left');
maze.cells[40 + 3].setWall('left');
maze.cells[40 + 6].setWall('left');
maze.cells[40 + 8].setWall('left');
maze.cells[40 + 0].setWall('top');
maze.cells[40 + 3].setWall('top');
maze.cells[40 + 7].setWall('top');
maze.cells[40 + 8].setWall('top');
maze.cells[40 + 0].setWall('right');
maze.cells[40 + 2].setWall('right');
maze.cells[40 + 5].setWall('right');
maze.cells[40 + 7].setWall('right');
maze.cells[40 + 9].setWall('right');
maze.cells[40 + 7].setWall('bottom');

// Row 6
maze.cells[50 + 0].setWall('left');
maze.cells[50 + 1].setWall('left');
maze.cells[50 + 4].setWall('left');
maze.cells[50 + 5].setWall('left');
maze.cells[50 + 6].setWall('left');
maze.cells[50 + 7].setWall('top');
maze.cells[50 + 0].setWall('right');
maze.cells[50 + 3].setWall('right');
maze.cells[50 + 4].setWall('right');
maze.cells[50 + 5].setWall('right');
maze.cells[50 + 9].setWall('right');
maze.cells[50 + 0].setWall('bottom');
maze.cells[50 + 2].setWall('bottom');
maze.cells[50 + 3].setWall('bottom');
maze.cells[50 + 8].setWall('bottom');

// Row 7
maze.cells[70 + 0].setWall('left');
maze.cells[70 + 2].setWall('left');
maze.cells[70 + 5].setWall('left');
maze.cells[70 + 7].setWall('left');
maze.cells[70 + 2].setWall('top');
maze.cells[70 + 3].setWall('top');
maze.cells[70 + 8].setWall('top');
maze.cells[70 + 1].setWall('right');
maze.cells[70 + 4].setWall('right');
maze.cells[70 + 6].setWall('right');
maze.cells[70 + 9].setWall('right');
maze.cells[70 + 0].setWall('bottom');
maze.cells[70 + 3].setWall('bottom');
maze.cells[70 + 4].setWall('bottom');
maze.cells[70 + 7].setWall('bottom');

// Row 8
maze.cells[60 + 0].setWall('left');
maze.cells[60 + 5].setWall('left');
maze.cells[60 + 6].setWall('left');
maze.cells[60 + 7].setWall('left');
maze.cells[60 + 8].setWall('left');
maze.cells[60 + 0].setWall('top');
maze.cells[60 + 3].setWall('top');
maze.cells[60 + 4].setWall('top');
maze.cells[60 + 7].setWall('top');
maze.cells[60 + 4].setWall('right');
maze.cells[60 + 5].setWall('right');
maze.cells[60 + 6].setWall('right');
maze.cells[60 + 7].setWall('right');
maze.cells[60 + 9].setWall('right');
maze.cells[60 + 2].setWall('bottom');
maze.cells[60 + 3].setWall('bottom');
maze.cells[60 + 6].setWall('bottom');

// Row 9
maze.cells[80 + 0].setWall('left');
maze.cells[80 + 2].setWall('top');
maze.cells[80 + 3].setWall('top');
maze.cells[80 + 6].setWall('top');
maze.cells[80 + 9].setWall('right');
maze.cells[80 + 3].setWall('bottom');

// Row 10
maze.cells[90 + 0].setWall('left');
maze.cells[90 + 1].setWall('left');
maze.cells[90 + 5].setWall('left');
maze.cells[90 + 6].setWall('left');
maze.cells[90 + 9].setWall('left');
maze.cells[90 + 3].setWall('top');
maze.cells[90 + 0].setWall('right');
maze.cells[90 + 4].setWall('right');
maze.cells[90 + 5].setWall('right');
maze.cells[90 + 8].setWall('right');
maze.cells[90 + 0].setWall('bottom');
maze.cells[90 + 1].setWall('bottom');
maze.cells[90 + 2].setWall('bottom');
maze.cells[90 + 3].setWall('bottom');
maze.cells[90 + 4].setWall('bottom');
maze.cells[90 + 5].setWall('bottom');
maze.cells[90 + 6].setWall('bottom');
maze.cells[90 + 7].setWall('bottom');
maze.cells[90 + 8].setWall('bottom');
maze.cells[90 + 9].setWall('bottom');

const maze10x10 = { maze, width, height };

export { maze10x10 };

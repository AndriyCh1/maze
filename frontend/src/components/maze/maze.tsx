import React from "react";
import { Cell, MazeWrapper, Player } from "./maze.styled";
import { Maze as MazeModel } from "./models/maze.model";
import { Walls } from "./models/cell.model";
import { mapCellsToGrid } from "../../common/utils/maze-cells-to-grid.util";

interface IProps {
  maze: MazeModel;
}

export const Maze: React.FC<IProps> = ({ maze }) => {
  const makeClassName = (walls: Walls, visited: boolean): string => {
    const classes = [];
    if (walls.get("top")) classes.push("wall-top");
    if (walls.get("right")) classes.push("wall-right");
    if (walls.get("bottom")) classes.push("wall-bottom");
    if (walls.get("left")) classes.push("wall-left");
    if (visited) classes.push("visited");

    return classes.join(" ");
  };

  const mazeGrid = mapCellsToGrid(maze.cells, maze.width);

  return (
    <MazeWrapper>
      <tbody>
        {mazeGrid.map((row, index) => (
          <tr key={index}>
            {row.map((cellRow, rowIndex) => (
              <Cell
                key={rowIndex}
                className={makeClassName(cellRow.walls, cellRow.visited)}
              >
                {cellRow.player && <Player />}
              </Cell>
            ))}
          </tr>
        ))}
      </tbody>
    </MazeWrapper>
  );
};

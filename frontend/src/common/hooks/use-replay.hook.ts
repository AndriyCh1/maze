import { useRef, useState } from "react";
import { Maze as MazeModel } from "../../components/maze/models/maze.model";
import {
  IAction,
  IGameState as IGameInitialConfig,
  IPlayerPosition,
} from "../types/game.type";

export const useReplay = () => {
  const [maze, setMaze] = useState<MazeModel | null>(null);
  const initialPosition = useRef<IPlayerPosition>();
  const prevAction = useRef<IAction | null>(null);

  const initializeMaze = (options: Omit<IGameInitialConfig, "room">) => {
    const { width, height } = options.mazeConfig;
    const playerPosition = options.playerPosition;
    const mazeInstance = new MazeModel(width, height);
    mazeInstance.setPlayerPosition(playerPosition);
    initialPosition.current = { ...playerPosition };
    setMaze(mazeInstance);
  };

  const updateMaze = () => {
    if (maze) {
      const newMaze = maze.getCopy();
      setMaze(newMaze);
    }
  };

  const handleAction = (action: IAction, back: boolean = false) => {
    console.log(action, "action");
    const { isWall, positionX, positionY, direction } = action;

    if (!maze) return;

    if (back) {
      revertPreviousAction();
    }

    const position = { x: positionX, y: positionY };
    const cell = maze.getCell(position);

    if (!cell) return;

    isWall ? cell.setWall(direction) : cell.removeWall(direction);

    prevAction.current = action;
    maze.setPlayerPosition(position);
    updateMaze();
  };

  const revertPreviousAction = () => {
    if (!maze) return;

    if (prevAction.current) {
      const { direction: prevDirection } = prevAction.current;

      const prevPosition = {
        x: prevAction.current.positionX,
        y: prevAction.current.positionY,
      };

      const oldCell = maze.getCell(prevPosition);

      if (oldCell) {
        oldCell.removeWall(prevDirection);
        oldCell.visited = false;
      }
    }
  };

  const handleNext = (action: IAction) => {
    handleAction(action);
  };

  const handleBack = (action: IAction) => {
    handleAction(action, true);
  };

  const resetPosition = () => {
    const position = initialPosition.current;
    revertPreviousAction();

    prevAction.current = null;

    if (maze && position) {
      maze.setPlayerPosition(position);
      const newMaze = maze.getCopy();
      setMaze(newMaze);
    }
  };

  return {
    maze,
    initializeMaze,
    handleNext,
    handleBack,
    initialPosition: initialPosition.current,
    resetPosition,
  };
};

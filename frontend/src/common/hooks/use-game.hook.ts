import { useEffect, useState } from "react";
import { socketService } from "../../services";
import { Maze as MazeModel } from "../../components/maze/models/maze.model";
import { ClientEvents, ServerEvents } from "../consts";
import {
  IGameState as IGameInitialConfig,
  IMoveResponse,
  IPlayerPosition,
  IWinner,
} from "../types/game.type";
import { IUser } from "../types/user.type";

export const useGame = () => {
  const [maze, setMaze] = useState<MazeModel | null>(null);
  const [playerPosition, setPlayerPosition] = useState<IPlayerPosition | null>(
    null
  );
  const [winner, setWinner] = useState<IWinner | null>(null);
  const [gaveUpUser, setGaveUpUser] = useState<IUser | null>(null);

  const startGame = (roomId: string) => {
    socketService.emit(ClientEvents.START_GAME, { roomId });
  };

  const _initializeMaze = (
    options: Omit<IGameInitialConfig, "room">
  ): MazeModel => {
    const { width, height } = options.mazeConfig;
    const { x, y } = options.playerPosition;
    const mazeInstance = new MazeModel(width, height);
    mazeInstance.setPlayerPosition({ x, y });
    return mazeInstance;
  };

  const _updateMaze = () => {
    if (maze) {
      const newMaze = maze.getCopy();
      setMaze(newMaze);
    }
  };

  const onWinner = ({ data }: { data: IWinner }) => {
    setWinner(data);
  };

  const onGameConfig = ({ data }: { data: IGameInitialConfig }) => {
    const mazeInstance = _initializeMaze(data);
    setMaze(mazeInstance);
    setPlayerPosition(data.playerPosition);
  };

  const onPlayerMove = ({ data }: { data: IMoveResponse }) => {
    const { isWall, position, direction, moved } = data;
    if (!moved || !playerPosition || !maze) return;

    const cell = maze.getCell(playerPosition);

    if (!cell) return;

    if (isWall && maze && playerPosition) {
      cell.setWall(direction!);
      _updateMaze();
      return;
    }

    maze.setPlayerPosition(position!);
    setPlayerPosition(position!);
    _updateMaze();
  };

  const onPlayerGaveUp = (user: IUser) => {
    setGaveUpUser(user);
  };

  const giveUp = (roomId: string) => {
    socketService.emit(ClientEvents.GIVE_UP, { roomId });
  };

  useEffect(() => {
    socketService.on(ServerEvents.INITIAL_GAME_CONFIG, onGameConfig);
    socketService.on(ServerEvents.PLAYER_WON, onWinner);
    socketService.on(ServerEvents.USER_GAVE_UP, onPlayerGaveUp);

    return () => {
      socketService.off(ServerEvents.INITIAL_GAME_CONFIG);
      socketService.off(ServerEvents.PLAYER_WON);
      socketService.off(ServerEvents.USER_GAVE_UP);
    };
  }, []);

  useEffect(() => {
    socketService.on(ServerEvents.MOVE, onPlayerMove);

    return () => {
      socketService.off(ServerEvents.MOVE);
    };
  }, [maze, playerPosition]);

  return { maze, playerPosition, startGame, winner, giveUp, gaveUpUser };
};

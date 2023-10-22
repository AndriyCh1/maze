import { socketService } from "../../services";
import { ClientEvents, Command } from "../consts";

export const useCommands = (roomId: string) => {
  const handleCommand = (command: Command) => {
    socketService.emit(ClientEvents.COMMAND, { command, roomId });
  };

  const handleUp = () => handleCommand(Command.UP);

  const handleRight = () => handleCommand(Command.RIGHT);

  const handleDown = () => handleCommand(Command.DOWN);

  const handleLeft = () => handleCommand(Command.LEFT);

  return { handleUp, handleRight, handleDown, handleLeft };
};

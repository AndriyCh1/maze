import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { RoomsManager } from './rooms.manager';
import { ClientEvents, Command, ServerEvents } from '../common/constants';
import { ICommand, MessageType, SocketWithAuth } from '../common/types';
import { JoinRoomDto } from './dto/join-game.dto';
import { GetGameStateDto } from './dto/get-game-state.dto';
import { MessageDto } from './dto/message.dto';
import { getMessageType } from '../common/utils/get-message-type';
import { v4 as uuidv4 } from 'uuid';
import { ActionService } from '../room/action.service';
import { Position } from '../maze/models/maze.model';
import {
  commandToDirection,
  commandToWay,
} from '../common/utils/convert-command.util';
import { CommandDto } from './dto/command.dto';

@WebSocketGateway()
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(
    private readonly roomsManager: RoomsManager,
    private readonly actionService: ActionService,
  ) {}

  async handleConnection(socket: SocketWithAuth) {
    console.log(`Client connected ${socket.userId}`);
  }

  async handleDisconnect(socket: SocketWithAuth) {
    console.log(`Client disconnected ${socket.userId}`);
  }

  @SubscribeMessage(ClientEvents.ROOMS_LIST)
  async handleRooms(socket: SocketWithAuth) {
    const rooms = await this.roomsManager.getAvailableRooms();
    socket.emit(ServerEvents.ROOMS_LIST, { data: rooms });
  }

  @SubscribeMessage(ClientEvents.CREATE_GAME)
  async handleCreateGame(socket: SocketWithAuth) {
    const createdRoom = await this.roomsManager.createRoom(socket.userId);
    socket.emit(ServerEvents.CREATED_ROOM, { data: createdRoom });

    const rooms = await this.roomsManager.getAvailableRooms();
    this.server.emit(ServerEvents.ROOMS_LIST, { data: rooms });
  }

  private startGame(roomId: string) {
    this.server.in(roomId).emit(ServerEvents.GAME_STARTED);
  }

  @SubscribeMessage(ClientEvents.JOIN_GAME)
  async handleJoinGame(socket: SocketWithAuth, dto: JoinRoomDto) {
    const roomId = dto.roomId;
    const userId = socket.userId;
    const { room, user } = await this.roomsManager.joinRoom(roomId, userId);

    socket.join(room.id);

    socket.to(room.id).emit(ServerEvents.USER_JOINED, {
      data: { user },
    });

    if (this.roomsManager.isRoomFull(room.id)) {
      this.startGame(room.id);
    }
  }

  private emitUserTurnStatuses(
    socket: SocketWithAuth,
    roomId: string,
    nextPlayerTurn: boolean,
  ) {
    socket.emit(ServerEvents.USER_TURN, !nextPlayerTurn);
    socket.broadcast.to(roomId).emit(ServerEvents.USER_TURN, nextPlayerTurn);
  }

  @SubscribeMessage(ClientEvents.GAME_STATE)
  async handleGameState(socket: SocketWithAuth, dto: GetGameStateDto) {
    const roomId = dto.roomId;
    const userId = socket.userId;
    const room = this.roomsManager.getRoom(roomId);
    const player = this.roomsManager.getUser(room.id, userId);

    await socket.emit(ServerEvents.GAME_STATE, {
      data: {
        room,
        mazeConfig: { width: room.maze.width, height: room.maze.height },
        playerPosition: { ...player.position },
      },
    });

    await this.emitUserTurnStatuses(
      socket,
      roomId,
      userId !== room.turnPlayerId,
    );
  }

  private async onCommand(socket: SocketWithAuth, data: ICommand) {
    const { command, roomId } = data;
    const userId = socket.userId;
    const user = this.roomsManager.getUser(roomId, userId);
    const room = this.roomsManager.getRoom(roomId);

    const maze = room.maze;
    const cell = maze.getCell(user.position);

    if (!cell) {
      throw new Error('Oops, some error occurred, maze issue');
    }

    if (userId !== room.turnPlayerId) {
      socket.emit(ServerEvents.MESSAGE, {
        data: {
          id: uuidv4(),
          user: user.user,
          timestamp: new Date(),
          message: 'Not your turn',
          moved: false,
        },
      });

      return;
    }

    const direction = commandToDirection(command);
    const isExit = maze.isExitInDirection(cell, direction);
    const isWall = maze.isWallInDirection(cell, direction);

    let newPosition: Position;

    if (!isWall) {
      newPosition = this.roomsManager.updateUserPosition(
        room.id,
        userId,
        direction,
      );
    }

    this.roomsManager.switchTurn(roomId);

    if (isExit) {
      await this.roomsManager.setWinner(roomId, userId);
      this.server.in(roomId).emit(ServerEvents.USER_WON, {
        data: { userId: user.user.id, username: user.user.username },
      });

      return;
    }

    await this.actionService.create({
      roomId,
      command,
      userId,
      positionX: newPosition?.x || user.position.x,
      positionY: newPosition?.y || user.position.y,
      isWall,
    });

    socket.emit(ServerEvents.MOVE, {
      data: {
        moved: true,
        isWall,
        isExit,
        position: newPosition || user.position,
        direction,
        command,
      },
    });

    this.emitUserTurnStatuses(socket, roomId, true);

    this.server.in(roomId).emit(ServerEvents.MESSAGE, {
      data: {
        id: uuidv4(),
        user: user.user,
        timestamp: new Date(),
        message: `Going ${commandToWay(command)}...`,
      },
    });
  }

  private isGameOver = (roomId: string) => {
    const room = this.roomsManager.getRoom(roomId);

    return (
      room.result.gaveUpUser !== null ||
      room.result.disconnectedUser ||
      room.result.winner
    );
  };

  @SubscribeMessage(ClientEvents.COMMAND)
  async handleCommand(socket: SocketWithAuth, dto: CommandDto) {
    const { command, roomId } = dto;
    if (this.isGameOver(roomId)) return;
    await this.onCommand(socket, { roomId, command });
  }

  @SubscribeMessage(ClientEvents.MESSAGE)
  async handleMessage(socket: SocketWithAuth, dto: MessageDto) {
    const { message, roomId } = dto;
    const userId = socket.userId;
    const messageType = getMessageType(message);
    const user = this.roomsManager.getUser(roomId, userId);
    const isCommand = messageType === MessageType.COMMAND;

    if (isCommand) {
      if (this.isGameOver(roomId)) return;

      await this.onCommand(socket, {
        roomId,
        command: message as Command,
      });
      return;
    }

    this.server.in(roomId).emit(ServerEvents.MESSAGE, {
      data: {
        id: uuidv4(),
        user: user.user,
        timestamp: new Date(),
        message,
      },
    });
  }

  @SubscribeMessage(ClientEvents.GIVE_UP)
  async handleGiveUp(socket: SocketWithAuth, dto: CommandDto) {
    const { roomId } = dto;
    const { userId } = socket;

    this.roomsManager.userGaveUp(roomId, userId);
    const user = await this.roomsManager.getUser(roomId, userId);

    this.server.in(roomId).emit(ServerEvents.USER_GAVE_UP, { user });
    this.server.in(roomId).emit(ServerEvents.MESSAGE, {
      data: {
        id: uuidv4(),
        user: user.user,
        timestamp: new Date(),
        message: `Player ${user.user.username} gave up!`,
      },
    });
  }
}

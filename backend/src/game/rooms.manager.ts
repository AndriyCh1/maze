import { Maze, Position } from '../maze/models/maze.model';
import { ActionService } from '../room/action.service';
import { Room } from '../room/entities/room.entity';
import { RoomService } from '../room/room.service';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { Maze as MazeModel } from '../maze/models/maze.model';
import { Injectable } from '@nestjs/common';
import { Direction } from '../maze/models/cell.model';

interface IGameResult {
  winner: User['id'] | null;
  gaveUpUser: User['id'] | null;
  disconnectedUser: User['id'] | null;
}

interface IUserSession {
  score: number;
  position: Position;
  user: Pick<User, 'username' | 'id'>;
}

interface IRoomSession {
  id: Room['id'];
  turnPlayerId: User['id'];
  users: IUserSession[];
  maze: Maze;
  result: IGameResult;
  timestamp: Date;
  owner: Pick<User, 'username' | 'id'>;
}

const MAX_PLAYERS = 2;
const INITIAL_POSITION = { x: 0, y: 0 };

const GAME_RESULT_INIT: IGameResult = {
  winner: null,
  gaveUpUser: null,
  disconnectedUser: null,
};

@Injectable()
export class RoomsManager {
  // In-memory storage
  private readonly rooms = new Map<Room['id'], IRoomSession>();

  constructor(
    private readonly userService: UserService,
    private readonly roomService: RoomService,
  ) {}

  async createRoom(ownerId: User['id']) {
    const room = await this.roomService.create({ ownerId });

    const mazeJson = JSON.parse(room.maze.json);
    const mazeModel = MazeModel.fromJSON(mazeJson);
    const owner = await this.userService.findOneById(ownerId);

    if (!owner) {
      throw new Error("User doesn't exist");
    }

    const roomSession: IRoomSession = {
      id: room.id,
      turnPlayerId: null,
      users: [],
      maze: mazeModel,
      result: { ...GAME_RESULT_INIT },
      timestamp: room.timestamp,
      owner,
    };

    this.rooms.set(room.id, roomSession);
    // FIXME: inconsistent data, this one is from DB
    return roomSession;
  }

  getRoom(roomId: Room['id']) {
    return this.rooms.get(roomId);
  }

  getUser(roomId: Room['id'], userId: User['id']) {
    const room = this.rooms.get(roomId);

    if (room) {
      return room.users.find((userSession) => userSession.user.id === userId);
    }

    return;
  }

  destroyRoom(roomId: Room['id']) {
    this.rooms.delete(roomId);
  }

  getAllRooms() {
    return Array.from(this.rooms.values());
  }

  getAvailableRooms() {
    return this.getAllRooms().filter(
      (room) => room.users.length !== MAX_PLAYERS,
    );
  }

  private checkIfRoomExists(roomId: IRoomSession['id']) {
    if (!this.rooms.has(roomId)) {
      throw new Error("Room doesn't exist");
    }
  }

  private getRandomUser(roomId: IRoomSession['id']): IUserSession['user'] {
    const room = this.rooms.get(roomId);
    const randomIndex = Math.floor(Math.random() * room.users.length);
    const player = room.users[randomIndex].user;
    return player;
  }

  isRoomFull(roomId: IRoomSession['id']) {
    const room = this.rooms.get(roomId);
    return room.users.length === MAX_PLAYERS;
  }

  async joinRoom(roomId: Room['id'], userId: User['id']) {
    this.checkIfRoomExists(roomId);

    const room = this.rooms.get(roomId);

    if (room.users.length === MAX_PLAYERS) {
      throw new Error('Room is already occupied.');
    }

    await this.roomService.addUserToRoom(userId, roomId);
    const user = await this.userService.findOneById(userId);

    const userSession: IUserSession = {
      position: INITIAL_POSITION,
      user: { id: user.id, username: user.username },
      score: 0,
    };

    room.users.push(userSession);

    if (this.isRoomFull(roomId)) {
      const initialCurrentPlayer = this.getRandomUser(roomId);
      room.turnPlayerId = initialCurrentPlayer.id;
    }

    return { room, user };
  }

  leaveRoom(roomId: Room['id'], userId: User['id']) {
    const room = this.rooms.get(roomId);

    if (room.turnPlayerId === userId) {
      room.turnPlayerId = null;
    }

    room.users = room.users.filter(
      (userSession) => userSession.user.id !== userId,
    );
  }

  isUserTurn(roomId: Room['id'], userId: User['id']) {
    this.checkIfRoomExists(roomId);

    return this.rooms.get(roomId).turnPlayerId === userId;
  }

  switchTurn(roomId: Room['id']) {
    this.checkIfRoomExists(roomId);

    const room = this.rooms.get(roomId);
    const currentIndex = room.users.findIndex(
      (userSession) => userSession.user.id === room.turnPlayerId,
    );
    const nextIndex = (currentIndex + 1) % room.users.length;
    room.turnPlayerId = room.users[nextIndex].user.id;
  }

  getScores(roomId: Room['id']) {
    this.checkIfRoomExists(roomId);

    const room = this.rooms.get(roomId);
    const scores = {};

    for (const userSession of room.users) {
      scores[userSession.user.id] = userSession.score;
    }

    return scores;
  }

  private getNewPosition(
    maze: MazeModel,
    position: Position,
    direction: Direction,
  ) {
    const newPosition = { ...position };

    if (direction === 'top' && position.y !== 0) {
      newPosition.y -= 1;
    }

    if (direction === 'right' && position.x + 1 !== maze.width) {
      newPosition.x += 1;
    }

    if (direction === 'bottom' && position.y + 1 !== maze.height) {
      newPosition.y += 1;
    }

    if (direction === 'left' && position.x !== 0) {
      newPosition.x -= 1;
    }

    return newPosition;
  }

  updateUserPosition(
    roomId: Room['id'],
    userId: User['id'],
    direction: Direction,
  ) {
    this.checkIfRoomExists(roomId);

    const user = this.getUser(roomId, userId);
    const room = this.getRoom(roomId);

    const newPosition = this.getNewPosition(
      room.maze,
      user.position,
      direction,
    );

    user.position = newPosition;
    return newPosition;
  }

  userGaveUp(roomId: Room['id'], userId: User['id']) {
    const room = this.getRoom(roomId);
    room.result.gaveUpUser = userId;
  }

  setWinner(roomId: Room['id'], userId: User['id']) {
    const room = this.getRoom(roomId);
    room.result.winner = userId;
  }

  setUserDisconnected(roomId: Room['id'], userId: User['id']) {
    const room = this.getRoom(roomId);
    room.result.disconnectedUser = userId;
  }
}

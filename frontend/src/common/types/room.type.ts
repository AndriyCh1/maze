import { IUser } from "./user.type";

export interface IRoom {
  id: string;
  owner: IUser;
  ownerId: string;
  timestamp: Date;
}

export type IRoomExtended = IRoom & {
  users: IUser[];
};

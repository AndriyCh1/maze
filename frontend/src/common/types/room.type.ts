import { IUser } from "./user.type";

export interface IRoom {
  id: string;
  owner: IUser;
  timestamp: Date;
}

export type IRoomExtended = IRoom & {
  users: IUser[];
};

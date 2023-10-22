import { IUser } from "./user.type";

export interface IMessage {
  id: string;
  message: string;
  timestamp: Date;
  user: IUser;
}

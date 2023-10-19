import io from "socket.io-client";
import { storageService } from "./storage.service";
import { STORAGE_KEYS } from "../common/consts";

const userId = storageService.getItem(STORAGE_KEYS.USER_ID);
const serverUrl = process.env.REACT_APP_WS_SERVER_URL || "";

export const socketService = io(serverUrl, {
  autoConnect: false,
  query: { userId },
});

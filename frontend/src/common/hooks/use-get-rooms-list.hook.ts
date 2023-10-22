import { useEffect, useState } from "react";
import { IRoom } from "../types/room.type";
import { socketService } from "../../services";
import { ClientEvents, ServerEvents } from "../consts";

interface IRoomList {
  data: IRoom[];
}

export const useGetRoomsList = () => {
  const [rooms, setRooms] = useState<IRoom[] | null>(null);

  useEffect(() => {
    addEventListeners();
    socketService.emit(ClientEvents.ROOMS_LIST);

    return () => {
      socketService.off(ServerEvents.ROOMS_LIST);
    };
  }, []);

  const addEventListeners = () => {
    socketService.on(ServerEvents.ROOMS_LIST, ({ data: rooms }: IRoomList) => {
      setRooms(rooms);
    });
  };

  return { rooms };
};

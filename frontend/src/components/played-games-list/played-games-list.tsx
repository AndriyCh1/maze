import { Button, Card, List, Spin, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { CardContent, Players } from "./plaed-games-list.styled";
import { IGameRoom, IRoomUser } from "../../common/types/game.type";
import { useAuthority } from "../../common/hooks";
import { httpService } from "../../services";
import { formatToLocalDate } from "../../common/utils/format-date.util";
import { AxiosError, isAxiosError } from "axios";
import { Container } from "../container";
import { useNavigate } from "react-router-dom";

export const PlayedGamesList: React.FC = () => {
  const navigate = useNavigate();
  const [gameRooms, setGameRooms] = useState<IGameRoom[] | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { userId } = useAuthority();

  const getGameRooms = async () => {
    try {
      const res = await httpService.get<IGameRoom[]>(`user/${userId}/rooms`);
      setGameRooms(res.data);
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        const error = err as AxiosError;
        setErrorMessage(error.message);
      }

      console.error(err);
    }
  };

  useEffect(() => {
    getGameRooms();
  }, []);

  const handleReplay = (roomId: string) => {
    navigate(`/played-games/replay/${roomId}`);
  };

  const findCurrentUserInRoom = (roomUsers: IRoomUser[]) => {
    return roomUsers.find((roomUser) => roomUser.user.id === userId);
  };

  if (errorMessage) {
    return <Container>Oops, some error occurred!</Container>;
  }

  if (!gameRooms) {
    return (
      <Container>
        <Spin />
      </Container>
    );
  }

  return (
    <List
      grid={{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 2, xl: 2 }}
      dataSource={gameRooms}
      renderItem={(room) => (
        <List.Item>
          <Card
            title={`Room | ${formatToLocalDate(new Date(room.timestamp))}`}
            extra={
              <Tag
                color={
                  findCurrentUserInRoom(room.roomUsers)?.winStatus
                    ? "success"
                    : "error"
                }
              >
                {findCurrentUserInRoom(room.roomUsers)?.winStatus
                  ? "Won"
                  : "Lost"}
              </Tag>
            }
          >
            <CardContent>
              <Players>
                {room.roomUsers.map((roomUser, index) => (
                  <span key={index}>{roomUser.user.username}</span>
                ))}
              </Players>
              <Button type="primary" onClick={() => handleReplay(room.id)}>
                Replay
              </Button>
            </CardContent>
          </Card>
        </List.Item>
      )}
    />
  );
};

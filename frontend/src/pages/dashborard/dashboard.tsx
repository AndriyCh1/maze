import React, { useEffect, useState } from "react";
import Title from "antd/es/typography/Title";
import { Button } from "antd";
import { Container } from "../../components/container";
import { useAuthority } from "../../common/hooks";
import { httpService, socketService } from "../../services";
import { IUser } from "../../common/types/user.type";
import { Dashboard } from "../../components/dashboard";
import { NewGameWrapper } from "./dashboard.styled";
import { ClientEvents, ServerEvents } from "../../common/consts";
import { IRoom } from "../../common/types/room.type";
import { useNavigate } from "react-router-dom";
import { Layout } from "../../components/layout";

interface ICreatedRoomResponse {
  data: IRoom;
}

export const DashboardPage: React.FC = () => {
  const { userId } = useAuthority();
  const [user, setUser] = useState<IUser | null>(null);
  const navigate = useNavigate();

  const getProfile = async () => {
    try {
      const res = await httpService.get<IUser>(`user/profile/${userId}`);
      setUser(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getProfile();

    socketService.connect();

    socketService.on(
      ServerEvents.CREATED_ROOM,
      ({ data: room }: ICreatedRoomResponse) => {
        navigate(`/waiting-room/${room.id}`);
      }
    );

    return () => {
      socketService.off(ServerEvents.CREATED_ROOM);
    };
  }, []);

  const handleNewGame = () => {
    socketService.emit(ClientEvents.CREATE_GAME);
  };

  return (
    <Container>
      <Layout>
        {user && <Title level={3}>Welcome, {user.username}</Title>}
        <NewGameWrapper>
          <Button type="primary" onClick={handleNewGame}>
            New game
          </Button>
        </NewGameWrapper>
        <Dashboard />
      </Layout>
    </Container>
  );
};

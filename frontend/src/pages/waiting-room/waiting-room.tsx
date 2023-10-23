import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { socketService } from "../../services";
import { ClientEvents, ServerEvents } from "../../common/consts";
import { ISocketError } from "../../common/types/socket.type";
import { Card } from "antd";
import { formatTime } from "../../common/utils/format-time.util";
import Title from "antd/es/typography/Title";
import Paragraph from "antd/es/typography/Paragraph";
import { Container } from "../../components/container";
import { useTimer } from "../../common/hooks";
import { Layout } from "../../components/layout";

export const WaitingRoomPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { timePassed, startTimer, stopTimer } = useTimer();
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleGameStarted = () => {
    navigate(`/game/${id}`);
  };

  useEffect(() => {
    socketService.emit(ClientEvents.JOIN_GAME, { roomId: id });

    socketService.on(ServerEvents.ERROR, ({ message }: ISocketError) => {
      setErrorMessage(message);
    });

    socketService.on(ServerEvents.GAME_STARTED, handleGameStarted);

    startTimer();

    return () => {
      socketService.off(ServerEvents.ERROR);
      socketService.off(ServerEvents.GAME_STARTED);
      stopTimer();
    };
  }, []);

  if (errorMessage) {
    return (
      <Container>
        <Title level={4}>{errorMessage}</Title>
      </Container>
    );
  }

  return (
    <Container>
      <Layout>
        <Card title={`Waiting Room #${id}`}>
          <Title level={3}>
            You started a new game {formatTime(timePassed)} ago.
          </Title>
          <Paragraph>Waiting for a second player...</Paragraph>
        </Card>
      </Layout>
    </Container>
  );
};

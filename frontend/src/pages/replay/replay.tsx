import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Container } from "../../components/container";
import { MazeContainer, NavigationButtonsWrapper } from "./replay.styled";
import { Maze } from "../../components/maze";
import { httpService } from "../../services";
import { IReplay } from "../../common/types/game.type";
import { useAuthority, useReplay } from "../../common/hooks";
import { AxiosError, isAxiosError } from "axios";
import { Button, Spin } from "antd";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";

export const Replay: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { userId } = useAuthority();
  const [replay, setReplay] = useState<IReplay | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const actionIndex = useRef<number>(-1);

  const { maze, initializeMaze, handleBack, handleNext, resetPosition } =
    useReplay();

  const getReplay = async () => {
    try {
      const url = `room/${id}/user/${userId}/replay`;
      const res = await httpService.get<IReplay>(url);
      setReplay(res.data);
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        const error = err as AxiosError;
        setErrorMessage(error.message);
      }
    }
  };

  useEffect(() => {
    getReplay();
  }, []);

  useEffect(() => {
    if (replay) {
      const playerPosition = {
        x: replay.room.roomUser.initialPositionX,
        y: replay.room.roomUser.initialPositionY,
      };

      initializeMaze({ mazeConfig: replay.room.mazeConfig, playerPosition });
    }
  }, [replay]);

  if (errorMessage) {
    return <Container>Oops, some error occurred!</Container>;
  }

  if (!replay || !maze) {
    return (
      <Container>
        <Spin />
      </Container>
    );
  }

  const handleNextClick = () => {
    const currentActionIndex = actionIndex.current;
    const totalActions = replay.actions.length;

    if (totalActions > currentActionIndex + 1) {
      handleNext(replay.actions[currentActionIndex + 1]);
      actionIndex.current += 1;
    }
  };

  const handleBackClick = () => {
    const currentActionIndex = actionIndex.current;
    if (currentActionIndex !== -1 && currentActionIndex > 0) {
      handleBack(replay.actions[currentActionIndex - 1]);
      actionIndex.current -= 1;
    } else {
      actionIndex.current = -1;
      resetPosition();
    }
  };

  return (
    <Container>
      <MazeContainer>
        <Maze maze={maze} />
        <NavigationButtonsWrapper>
          <Button onClick={handleBackClick}>
            <ArrowLeftOutlined />
          </Button>
          <Button onClick={handleNextClick}>
            <ArrowRightOutlined />
          </Button>
        </NavigationButtonsWrapper>
      </MazeContainer>
    </Container>
  );
};

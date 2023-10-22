import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Chat } from "../../components/chat";
import {
  ActionButtonsWrapper,
  ChatContainer,
  GameContainer,
  MazeContainer,
  MovementControlsWrapper,
} from "./game.styled";
import { Maze } from "../../components/maze";
import { Container } from "../../components/container";
import { Modal } from "antd";
import { useAuthority, useCommands, useGame } from "../../common/hooks";
import MovementControls from "../../components/movement-controls/movement-controls";
import { ActionButtons } from "../../components/action-buttons";

export const Game: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { userId } = useAuthority();
  const { maze, playerPosition, winner, startGame, giveUp, gaveUpUser } =
    useGame();
  const { handleUp, handleRight, handleDown, handleLeft } = useCommands(id!);

  const [winnerModal, setWinnerModal] = useState(false);
  const [giveUpModal, setGiveUpModal] = useState(false);

  useEffect(() => {
    if (id) startGame(id);
  }, []);

  useEffect(() => {
    setWinnerModal(true);
  }, [winner]);

  const handleWinnerModalClose = () => {
    setWinnerModal(false);
  };

  const handleToHome = () => {
    navigate("/");
  };

  const handleGiveUpSubmit = () => {
    if (id) giveUp(id);
    setGiveUpModal(false);
  };

  const handleGiveUp = () => {
    setGiveUpModal(true);
  };

  if (!id) {
    return <div>Oops, something went wrong...</div>;
  }

  return (
    <Container>
      {playerPosition && maze && (
        <GameContainer>
          <ChatContainer>
            <Chat roomId={id} playerPosition={playerPosition} />
          </ChatContainer>
          <MazeContainer>
            <ActionButtonsWrapper>
              <ActionButtons
                onExit={handleToHome}
                onGiveUp={handleGiveUp}
                showExit={!!gaveUpUser || !!winner}
              />
            </ActionButtonsWrapper>
            <Maze maze={maze} />
            <MovementControlsWrapper>
              <MovementControls
                onDown={handleDown}
                onUp={handleUp}
                onRight={handleRight}
                onLeft={handleLeft}
              />
            </MovementControlsWrapper>
          </MazeContainer>
        </GameContainer>
      )}

      {winnerModal && winner && winner.userId === userId && (
        <Modal
          title="Congratulations!"
          open
          onOk={handleToHome}
          onCancel={handleWinnerModalClose}
          okText={"Home"}
          cancelButtonProps={{ style: { display: "none" } }}
        >
          <p>Congratulations, you have won the game!</p>
        </Modal>
      )}

      {winnerModal && winner && winner.userId !== userId && (
        <Modal
          title="You've lost =("
          open
          onOk={handleToHome}
          onCancel={handleWinnerModalClose}
          okText={"Home"}
          cancelButtonProps={{ style: { display: "none" } }}
        >
          <p>{winner?.username} has won!</p>
        </Modal>
      )}

      {giveUpModal && (
        <Modal
          title="Are you sure you want to give up?"
          open
          onOk={handleGiveUpSubmit}
          onCancel={() => setGiveUpModal(false)}
          okText={"Submit"}
        />
      )}
    </Container>
  );
};

import React from "react";
import { Button } from "antd";
import { ButtonsContainer } from "./action-buttons.styled";

interface GiveUpExitButtonsProps {
  onGiveUp: () => void;
  onExit: () => void;
  showExit: boolean;
}

export const ActionButtons: React.FC<GiveUpExitButtonsProps> = ({
  onGiveUp,
  onExit,
  showExit = false,
}) => {
  const handleGiveUp = () => {
    onGiveUp();
  };

  const handleExit = () => {
    onExit();
  };

  return (
    <ButtonsContainer>
      {showExit && (
        <Button type="dashed" danger onClick={handleExit}>
          Exit
        </Button>
      )}
      {!showExit && (
        <Button type="dashed" danger onClick={handleGiveUp}>
          Give Up
        </Button>
      )}
    </ButtonsContainer>
  );
};

export default ActionButtons;

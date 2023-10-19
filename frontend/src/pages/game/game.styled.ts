import styled from "styled-components";

export const GameContainer = styled.div`
  height: 90vh;
  display: grid;
  grid-template-columns: auto 1fr;
`;

export const ChatContainer = styled.div`
  margin: 10px;
  align-self: end;
`;

export const MazeContainer = styled.div`
  background-color: #ebeced;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.3rem;
  position: relative;
`;

export const MovementControlsWrapper = styled.div`
  width: 250px;
  position: absolute;
  bottom: 20px;
  right: 50%;
  transform: translateX(50%);
`;

export const ActionButtonsWrapper = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
`;

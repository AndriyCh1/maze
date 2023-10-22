import styled from "styled-components";

export const MazeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #ebeced;
  min-width: 50%;
  align-items: center;
  border-radius: 0.3rem;
  padding: 3em;
  gap: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const NavigationButtonsWrapper = styled.div`
  display: flex;
  margin: 10px;
  gap: 10px;
`;

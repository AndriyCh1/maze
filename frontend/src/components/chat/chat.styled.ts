import styled from "styled-components";

export const Messages = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  max-height: 500px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const InputForm = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-top: 10px;
`;

export const ChatContainer = styled.div`
  height: 100%;
  width: 350px;
`;

import styled from "styled-components";

export const MessageContainer = styled.div`
  background-color: #ebeced;
  border-radius: 8px;
  padding: 10px;
`;

export const MessageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const MessageText = styled.p`
  font-size: 16px;
  margin: 0;
  margin-top: 5px;
`;

export const Timestamp = styled.span`
  font-size: 12px;
  color: #999;
`;

export const UserName = styled.span`
  font-size: 14px;
  font-weight: bold;
`;

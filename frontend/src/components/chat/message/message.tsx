import React from "react";
import { IMessage } from "../../../common/types/message.type";
import {
  MessageContainer,
  MessageHeader,
  MessageText,
  Timestamp,
  UserName,
} from "./message.styled";
import { formatToLocalTime } from "../../../common/utils/format-time.util";

interface IProps {
  message: IMessage;
}

export const Message: React.FC<IProps> = ({ message }) => {
  const { message: text, user, timestamp } = message;
  return (
    <MessageContainer>
      <MessageHeader>
        <UserName>{user.username}</UserName>
        <Timestamp>{formatToLocalTime(new Date(timestamp))}</Timestamp>
      </MessageHeader>
      <MessageText>{text}</MessageText>
    </MessageContainer>
  );
};

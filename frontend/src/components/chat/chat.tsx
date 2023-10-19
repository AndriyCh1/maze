import { Button, Input, Tag } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { socketService } from "../../services";
import { ClientEvents, ServerEvents } from "../../common/consts";
import { IMessage } from "../../common/types/message.type";
import { Message } from "./message";
import { ChatContainer, InputForm, Messages } from "./chat.styled";
import { TurnNotifier } from "../turn-notifier/turn-notifier";

interface IProps {
  roomId: string;
  playerPosition: {
    x: number;
    y: number;
  };
}

export const Chat: React.FC<IProps> = ({ roomId, playerPosition }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [myTurn, setMyTurn] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    socketService.on(ServerEvents.MESSAGE, ({ data }: { data: IMessage }) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    socketService.on(ServerEvents.USER_TURN, (turn: boolean) => {
      setMyTurn(turn);
    });

    return () => {
      socketService.off(ServerEvents.MESSAGE);
      socketService.off(ServerEvents.USER_TURN);
    };
  }, []);

  const sendMessage = () => {
    if (message) {
      socketService.emit(ClientEvents.MESSAGE, {
        message,
        roomId,
        positionX: playerPosition.x,
        positionY: playerPosition.y,
      });
      setMessage("");
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <ChatContainer>
      <Messages>
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef}></div>
      </Messages>
      <TurnNotifier isTurn={myTurn} />
      <InputForm>
        <Input
          placeholder="Type your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onPressEnter={sendMessage}
        />
        <Button type="primary" onClick={sendMessage}>
          Send
        </Button>
      </InputForm>
    </ChatContainer>
  );
};

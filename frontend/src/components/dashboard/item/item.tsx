import { Button } from "antd";
import React from "react";
import { IRoom } from "../../../common/types/room.type";
import {
  ItemBody,
  OwnerName,
  RoomDetails,
  RoomInfoContainer,
  RoomTitle,
  Wrapper,
} from "./item.styled";
import { useNavigate } from "react-router-dom";
import { formatToLocalDate } from "../../../common/utils/format-date.util";

interface IProps {
  room: IRoom;
}

export const Item: React.FC<IProps> = ({ room }) => {
  const navigate = useNavigate();

  const handlePlay = () => {
    navigate(`/waiting-room/${room.id}`);
  };

  return (
    <Wrapper>
      <ItemBody>
        <RoomInfoContainer>
          <RoomTitle>Room #{room.id.slice(1, 15)}</RoomTitle>
          <RoomDetails>
            <span>{formatToLocalDate(new Date(room.timestamp))}</span>
            <span>
              Created by <OwnerName>{room.owner.username}</OwnerName>
            </span>
          </RoomDetails>
        </RoomInfoContainer>
        <Button type="primary" onClick={handlePlay}>
          Play
        </Button>
      </ItemBody>
    </Wrapper>
  );
};

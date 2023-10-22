import React from "react";
import { useGetRoomsList } from "../../common/hooks/use-get-rooms-list.hook";
import { Card, List } from "antd";
import { Item } from "./item/item";

export const Dashboard: React.FC = () => {
  const { rooms } = useGetRoomsList();

  return (
    <Card title="Waiting list">
      {rooms?.map((room) => (
        <List key={room.id}>
          <Item room={room} />
        </List>
      ))}
    </Card>
  );
};

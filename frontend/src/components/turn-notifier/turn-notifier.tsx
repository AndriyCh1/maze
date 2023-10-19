import { Tag } from "antd";
import React from "react";

interface IProps {
  isTurn: boolean;
}

export const TurnNotifier: React.FC<IProps> = ({ isTurn }) => {
  return isTurn ? (
    <Tag color="green">Your turn</Tag>
  ) : (
    <Tag color="red">Opponent's turn</Tag>
  );
};

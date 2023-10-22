import { Button } from "antd";
import React from "react";
import { Wrapper } from "./navigation-buttons.styled";

export const NavigationButtons: React.FC = () => {
  return (
    <Wrapper>
      <Button>back</Button>
      <Button>next</Button>
    </Wrapper>
  );
};

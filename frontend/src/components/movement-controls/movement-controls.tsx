import React from "react";
import { Button, Row, Col } from "antd";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from "@ant-design/icons";
import { StyledCol } from "./movement-controls.styled";

interface MovementControlsProps {
  onUp: () => void;
  onRight: () => void;
  onDown: () => void;
  onLeft: () => void;
}
const MovementControls: React.FC<MovementControlsProps> = ({
  onUp,
  onRight,
  onLeft,
  onDown,
}) => {
  return (
    <Row gutter={[0, 10]}>
      <StyledCol span={8} style={{}}>
        <Button type="dashed" icon={<ArrowLeftOutlined />} onClick={onLeft}>
          Left
        </Button>
      </StyledCol>
      <StyledCol span={8}>
        <Button type="dashed" icon={<ArrowUpOutlined />} onClick={onUp}>
          Up
        </Button>
      </StyledCol>
      <StyledCol span={8}>
        <Button type="dashed" icon={<ArrowRightOutlined />} onClick={onRight}>
          Right
        </Button>
      </StyledCol>
      <StyledCol span={24}>
        <Button type="dashed" icon={<ArrowDownOutlined />} onClick={onDown}>
          Down
        </Button>
      </StyledCol>
    </Row>
  );
};

export default MovementControls;

import styled from "styled-components";

export const MazeWrapper = styled.table`
  border-collapse: collapse;
  padding: 10px;
`;

export const Cell = styled.td`
  width: 40px;
  height: 40px;
  position: relative;
  text-align: center;

  &.wall-top {
    border-top: 3px solid #000;
  }

  &.wall-right {
    border-right: 3px solid #000;
  }

  &.wall-bottom {
    border-bottom: 3px solid #000;
  }

  &.wall-left {
    border-left: 3px solid #000;
  }

  &.visited:after {
    content: "";
    width: 10px;
    height: 10px;
    background: #0589f5;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  }
`;

export const Player = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #53edb2;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
`;

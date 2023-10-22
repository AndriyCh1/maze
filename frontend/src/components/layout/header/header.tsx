import React from "react";
import { Link } from "react-router-dom";
import { StyledHeader } from "./header.styled";

export const Header: React.FC = () => {
  return (
    <StyledHeader>
      <Link to="/played-games">Played games</Link>
      <Link to="/dashboard">Dashboard</Link>
    </StyledHeader>
  );
};

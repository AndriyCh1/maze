import React from "react";
import { Container } from "../../components/container";
import { PlayedGamesList } from "../../components/played-games-list";

export const PlayedGames: React.FC = () => {
  return (
    <Container>
      <PlayedGamesList />
    </Container>
  );
};

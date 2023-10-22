import React from "react";
import { Container } from "../../components/container";
import { PlayedGamesList } from "../../components/played-games-list";
import { Layout } from "../../components/layout";

export const PlayedGames: React.FC = () => {
  return (
    <Container>
      <Layout>
        <PlayedGamesList />
      </Layout>
    </Container>
  );
};

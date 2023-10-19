import React from "react";
import "../style.css";
import { MainRouter } from "../router/router";
import { ConfigProvider as ThemeProvider } from "antd";

export const AppContainer: React.FC = () => {
  return (
    <ThemeProvider>
      <MainRouter />
    </ThemeProvider>
  );
};

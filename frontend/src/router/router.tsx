import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "../pages/home/home";
import { DashboardPage } from "../pages/dashborard/dashboard";
import { WaitingRoomPage } from "../pages/waiting-room";
import { Game } from "../pages/game";

export const MainRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/waiting-room/:id" element={<WaitingRoomPage />} />
        <Route path="/game/:id" element={<Game />} />
      </Routes>
    </BrowserRouter>
  );
};

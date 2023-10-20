import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "../pages/home/home";
import { DashboardPage } from "../pages/dashborard/dashboard";
import { WaitingRoomPage } from "../pages/waiting-room";
import { Game } from "../pages/game";
import { ProtectedRoute } from "./protected-route";

export const MainRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<DashboardPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/waiting-room/:id"
          element={
            <ProtectedRoute>
              <WaitingRoomPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/game/:id"
          element={
            <ProtectedRoute>
              <Game />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

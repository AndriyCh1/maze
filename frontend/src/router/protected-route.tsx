import { Navigate } from "react-router-dom";

import React from "react";
import { useAuthority } from "../common/hooks";

export type IProps = {
  redirectTo?: string;
  children: JSX.Element;
};

export const ProtectedRoute: React.FC<IProps> = ({
  redirectTo = "/",
  children,
}) => {
  const { userId } = useAuthority();

  return !userId ? <Navigate to={redirectTo} /> : children;
};

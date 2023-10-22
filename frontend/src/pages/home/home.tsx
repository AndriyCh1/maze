import React, { useEffect } from "react";
import { LoginForm } from "../../components/login-form";
import { FormContainer } from "./home.styled";
import { useAuthority } from "../../common/hooks";
import { useNavigate } from "react-router-dom";

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { userId } = useAuthority();

  useEffect(() => {
    if (userId) {
      navigate("dashboard");
    }
  }, []);

  return (
    <FormContainer>
      <LoginForm />
    </FormContainer>
  );
};

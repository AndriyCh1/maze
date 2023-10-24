import React, { ChangeEvent, FormEvent, useState } from "react";
import { Input, Button } from "antd/es";
import { Error, StyledForm } from "./login-form.styled";
import { httpService, storageService } from "../../services";
import { IUser } from "../../common/types/user.type";
import { STORAGE_KEYS } from "../../common/consts";
import { useNavigate } from "react-router-dom";

export const LoginForm: React.FC = () => {
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim()) {
      setErrorMessage("Name is required");
      return;
    }

    try {
      const res = await httpService.post<IUser, { username: string }>(
        "user/signup",
        { username: name }
      );

      const { data: user } = res;
      storageService.setItem(STORAGE_KEYS.USER_ID, user.id);

      navigate("/dashboard");
    } catch (err) {
      console.error(err, "Something went wrong");
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <div>
        <Input
          placeholder="Enter your name"
          value={name}
          onChange={handleChangeName}
          style={{ fontSize: "15px" }}
        />
        {errorMessage && <Error>{errorMessage}</Error>}
      </div>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </StyledForm>
  );
};

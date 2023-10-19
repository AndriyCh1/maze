import React from "react";
import { Input, Button } from "antd/es";
import { useFormik } from "formik";
import { StyledForm } from "./login-form.styled";
import { httpService, storageService } from "../../services";
import { IUser, IUserSignup } from "../../common/types/user.type";
import { STORAGE_KEYS } from "../../common/consts";
import { useNavigate } from "react-router-dom";

export const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const handleSubmit = async (values: IUserSignup) => {
    try {
      const { data: user } = await httpService.post<IUser, IUserSignup>(
        "user/signup",
        values
      );

      storageService.setItem(STORAGE_KEYS.USER_ID, user.id);
      navigate("/dashboard");
    } catch (err) {
      console.error(err, "Something went wrong");
    }
  };

  const formik = useFormik({
    initialValues: { username: "" },
    onSubmit: handleSubmit,
  });

  return (
    <StyledForm onSubmit={formik.handleSubmit}>
      <Input
        name="username"
        placeholder="Enter your name"
        value={formik.values.username}
        onChange={formik.handleChange}
        style={{ fontSize: "15px" }}
      />
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </StyledForm>
  );
};

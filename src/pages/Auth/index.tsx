import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import { IForm } from "./types.ts";
import { Button } from "antd";
import { useState } from "react";
import authInstance from "../../helpers/axios";

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: var(--m-default);
    align-items: flex-start;
`;

const Index = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IForm>({
    mode: "onBlur",
  });
  const [axiosError, setAxiosError] = useState("");

  const auth: SubmitHandler<IForm> = async (data) => {
    setAxiosError("");
    try {
      const response = await authInstance.post("auth/token/", data);
      localStorage.setItem("access_token", response.headers["authorization"]);
      window.dispatchEvent(new Event("storage"));
    } catch (e) {
      if (e?.response?.status === 403) setAxiosError("Invalid user or password");
      else setAxiosError("Error");
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit(auth)}>
      <input
        {...register("username", {
          required: "Required field",
        })}
        placeholder="Username"
      />
      <div>{errors.username?.message}</div>

      <input
        {...register("password", {
          required: "Required field",
          minLength: { value: 8, message: "Minimum password length 8 characters" },
        })}
        placeholder="Password"
        type="password"
      />
      <div>{errors.password?.message}</div>

      {axiosError && <span>{axiosError}</span>}

      <Button htmlType="submit" disabled={!isValid}>
        Log in
      </Button>
    </StyledForm>
  );
};

export default Index;

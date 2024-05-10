import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import { IForm } from "./types.ts";
import { Button } from "antd";
import axios from "axios";

const API_URL = "http://localhost:8000/";

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
    reset,
  } = useForm<IForm>({
    mode: "onBlur",
  });

  // const [tasks, setTasks] = useState<ITasks[]>([]);

  const auth: SubmitHandler<IForm> = async (data) => {
    try {
      console.log(data);
      const response = await axios.post(`${API_URL}auth/token/`, data, {
        // headers: {
        //   "Content-Type": "application/json",
        //   "Accept": "application/json",
        // },
      });
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit(auth)}>
      <input
        {...register("username", {
          required: "Поле обязательно для заполнения",
        })}
      />
      <div>{errors.username?.message}</div>

      <input
        {...register("password", {
          required: "Поле обязательно для заполнения",
        })}
      />
      <div>{errors.password?.message}</div>

      <Button htmlType="submit" disabled={!isValid}>
        Войти
      </Button>
    </StyledForm>
  );
};

export default Index;

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { StyledButton } from "../global-styles";
import styled from "styled-components";

interface IMyForm {
  first: string;
  second: string;
  third: string;
}

const Form = () => {
  const {
    register, // метод для регистрации вашего инпута, для дальнейшей работы с ним
    handleSubmit, // метод для получения данных формы, если валидация прошла успешна
    formState: { errors, isValid }, // errors - список ошибок валидации для всех полей формы
    reset, // метод для очистки полей формы
  } = useForm<IMyForm>({
    mode: "onBlur", // парметр onBlur - отвечает за запуск валидации при не активном состоянии поля
  });

  const [tasks, setTasks] = useState<IMyForm[]>([]);

  const saveElement: SubmitHandler<IMyForm> = (data) => {
    // здесь мы передаём новый массив, который содержит все старые элементы и новый
    // ...prev - мы получаем все элементы текущего стэйте (с помощью spread оператора)
    setTasks((prev) => [...prev, data]);
    reset();
  };

  const StyledForm = styled.form`
      display: flex;
      flex-direction: column;
      gap: var(--m-default);
      align-items: flex-start;
  `;

  const FormOutput = styled.div`
      display: flex;
      flex-direction: column;
      gap: var(--m-default);

      p {
          margin: 0;
      }
  `;

  return (
    <StyledForm onSubmit={handleSubmit(saveElement)}>
      <input
        {...register("first", {
          required: "Поле обязательно для заполнения",
          minLength: {
            value: 5,
            message: "Нужно больше символов",
          },
        })}
      />
      <div>{errors.first?.message}</div>
      <input
        {...register("second", {
          required: "Поле обязательно для заполнения",
          minLength: {
            value: 10,
            message: "Нужно больше символов",
          },
        })}
      />
      <div>{errors.second?.message}</div>
      <input
        {...register("third", {
          required: "Поле обязательно для заполнения",
          minLength: {
            value: 10,
            message: "Нужно больше символов",
          },
        })}
      />
      <div>{errors.third?.message}</div>
      <StyledButton htmlType="submit" disabled={!isValid}>
        Сохранить
      </StyledButton>
      <FormOutput>
        {tasks.map((task) => (
          <>
            <p>first: {task.first}</p>
            <p>second {task.second}</p>
            <p>third: {task.third}</p>
          </>
        ))}
      </FormOutput>
    </StyledForm>
  );
};

export default Form;

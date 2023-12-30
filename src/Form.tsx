import React from "react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface IMyForm {
  username: string;
  password: string;
  country: string;
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

  return (
    <form onSubmit={handleSubmit(saveElement)}>
      <input
        {...register("username", {
          required: "Поле обязательно для заполнения",
          minLength: {
            value: 5,
            message: "Нужно больше символов",
          },
        })}
      />
      <div>{errors.username?.message}</div>
      <input
        {...register("password", {
          required: "Поле обязательно для заполнения",
          minLength: {
            value: 10,
            message: "Нужно больше символов",
          },
        })}
      />
      <div>{errors.password?.message}</div>
      <input
        {...register("country", {
          required: "Поле обязательно для заполнения",
          minLength: {
            value: 10,
            message: "Нужно больше символов",
          },
        })}
      />
      <div>{errors.country?.message}</div>
      <button type="submit" disabled={!isValid}>
        Сохранить
      </button>
      {tasks.map((task) => (
        <>
          <p>
            {task.username} - {task.password}
          </p>
          <p>{task.country}</p>
        </>
      ))}
    </form>
  );
};

export default Form;

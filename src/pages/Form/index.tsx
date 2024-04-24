import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { StyledButton } from "../../global-styles.tsx";
import styled from "styled-components";
import { IForm, ITasks } from "./types.ts";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PdfDocument from "../../components/PdfDocument";

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

  const [tasks, setTasks] = useState<ITasks[]>([]);

  const saveElement: SubmitHandler<IForm> = (data) => {
    const reader = new FileReader();
    reader.readAsDataURL(data.picture[0]);

    reader.onload = () => {
      setTasks([{ first: data.first, picture: reader.result as string }]);
      reset();
    };
  };

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
        type="file"
        accept="image/*"
        {...register("picture", {
          required: "Загрузить картинку обязательно",
        })}
      />
      <div>{errors.picture?.message}</div>

      <StyledButton htmlType="submit" disabled={!isValid}>
        Сохранить
      </StyledButton>
      {!!tasks[0]?.first && !!tasks[0]?.picture && (
        <PDFDownloadLink
          document={<PdfDocument first={tasks[0].first} picture={tasks[0].picture} />}
          fileName="doc.pdf"
        >
          {({ loading }) => (loading ? "Загрузка..." : "Скачать")}
        </PDFDownloadLink>
      )}
    </StyledForm>
  );
};

export default Index;

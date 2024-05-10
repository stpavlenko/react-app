import Form from "./index.tsx";
import { render, screen } from "@testing-library/react";
import { userEvent } from "../../../tests/setup.tsx";

describe("Form", () => {
  it("enables submit button if form is valid", async () => {
    render(<Form />);
    const input = screen.getByTestId("input");
    const submitBtn: HTMLButtonElement = screen.getByTestId("submit-btn");
    const file: File = new File(["hello"], "hello.png", { type: "image/png" });

    await userEvent.type(input, "loooong text");
    await userEvent.upload(screen.getByTestId("image-upload"), file);

    expect(submitBtn.disabled).toBe(false);
  });
});

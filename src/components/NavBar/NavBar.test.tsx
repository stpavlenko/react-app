import { describe, it } from "vitest";
import NavBar from "./index.tsx";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

describe("NavBar", () => {
  it("renders Pokemons item label", () => {
    render(
      <BrowserRouter>
        <NavBar />,
      </BrowserRouter>,
    );

    expect(screen.getByText("Pokemons")).toBeInTheDocument();
  });

  it("renders AuthItems if isAuth=true is passed", () => {
    render(
      <BrowserRouter>
        <NavBar />,
      </BrowserRouter>,
    );

    expect(screen.getByText("Form")).toBeInTheDocument();
  });
});

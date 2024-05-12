import { describe } from "vitest";
import { render, screen } from "@testing-library/react";
import PokemonCard from "./index.tsx";

const NAME: string = "bulbasaur";
const URL: string = "https://pokeapi.co/api/v2/pokemon/1/";

const renderPokemonCard = () => {
  render(<PokemonCard name={NAME} url={URL} />);
};

describe("PokemonCard", () => {
  it("renders pokemon name from name prop", () => {
    renderPokemonCard();
    const name = screen.getByText(`My name is ${NAME}!`);
    expect(name).toBeInTheDocument();
  });

  it("renders image with correct source id from url prop", () => {
    const IMG_SRC =
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/1.gif";
    renderPokemonCard();

    const img: HTMLImageElement = screen.getByTestId("pokemon-card-img");

    expect(img.src).toBe(IMG_SRC);
  });
});

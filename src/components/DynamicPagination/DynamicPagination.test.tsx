import { beforeEach, describe, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import DynamicPagination from "./index.tsx";
import axios from "axios";

const MOCK_RESPONSE = {
  results: [
    {
      name: "bulbasaur",
      url: "https://pokeapi.co/api/v2/pokemon/1/",
    },
    {
      name: "ivysaur",
      url: "https://pokeapi.co/api/v2/pokemon/2/",
    },
  ],
};

vi.mock("axios");
const mockedAxios = vi.mocked(axios, true);

describe("DynamicPaginaiton", () => {
  beforeEach(() => {
    mockedAxios.get.mockResolvedValue({
      data: MOCK_RESPONSE,
    });
  });

  it("renders PokemonCard's ", async () => {
    render(<DynamicPagination />);

    await waitFor(async () => {
      const pokemonCards = await screen.findAllByTestId("pokemon-card");
      expect(pokemonCards.length).toEqual(MOCK_RESPONSE.results.length);
    });
  });
});

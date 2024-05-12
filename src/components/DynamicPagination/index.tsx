import { FC, useEffect, useState } from "react";
import PokemonCard from "../PokemonCard";
import { IPokemonItem } from "../PokemonCard/types.ts";
import axios from "axios";
import { useInView } from "react-intersection-observer";
import { Flex } from "antd";
import { Observer } from "./style.tsx";

const API_URL = "https://pokeapi.co/api/v2/pokemon";
const LIMIT = 10;

const DynamicPagination: FC = () => {
  const [pokemons, setPokemons] = useState<IPokemonItem[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const { ref, inView } = useInView({
    threshold: 0.5,
  });
  const getData = async (page: number, limit: number) => {
    const offset = (page - 1) * limit;

    try {
      setIsLoading(true);
      const response = await axios.get(API_URL, {
        params: { limit, offset },
      });
      setPokemons((prev) => [...prev, ...response.data.results]);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData(page, LIMIT);
  }, [page]);

  useEffect(() => {
    if (inView) setPage((prev) => prev + 1);
  }, [inView]);

  return (
    <>
      <Flex wrap="wrap" gap="middle" justify="space-between">
        {pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.name} name={pokemon.name} url={pokemon.url} />
        ))}
      </Flex>

      {!isLoading && <Observer ref={ref}></Observer>}
    </>
  );
};

export default DynamicPagination;

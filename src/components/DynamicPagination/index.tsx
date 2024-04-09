import {FC, useEffect, useState} from "react";
import PokemonCard from "../PokemonCard";
import {IPokemonCard} from "../PokemonCard/types.ts";
import axios from "axios";
import {useInView} from "react-intersection-observer";
import {Flex} from "antd";
import styled from "styled-components";

const API_URL = "https://pokeapi.co/api/v2/pokemon";
const LIMIT = 10;

const Observer = styled.div`
    visibility: hidden;
    height: 3rem;
`
const DynamicPagination: FC = () => {
    const [pokemons, setPokemons] = useState<IPokemonCard[]>([])
    const [page, setPage] = useState<number>(1);
    const {ref, inView} = useInView({
        threshold: 0.5,
    });
    const getData = async (page: number, limit: number) => {
        const offset = (page - 1) * limit;

        const response = await axios.get(API_URL, {
            params: {limit, offset},
        });

        setPokemons(prev => [...prev, ...response.data.results])
    };

    useEffect(() => {
        getData(page, LIMIT);
    }, [page]);

    useEffect(() => {
        if (inView) setPage((prev) => prev + 1)
    }, [inView]);

    return (
        <>
            <Flex wrap="wrap" gap="middle" justify="space-between">
                {pokemons.map(pokemon => (
                    <PokemonCard
                        key={pokemon.name}
                        name={pokemon.name}
                        url={pokemon.url}
                    />
                ))}
            </Flex>

            <Observer ref={ref}></Observer>
        </>
    )
}

export default DynamicPagination;
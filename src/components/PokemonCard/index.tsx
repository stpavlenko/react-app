import { FC } from "react";
import { IPokemonCardProps } from "./types.ts";
import { Card } from "antd";

const PokemonCard: FC<IPokemonCardProps> = ({ name, url }) => {
  const id = url.split("/").at(-2);

  return (
    <Card
      style={{ width: 200 }}
      cover={
        <img
          alt="pokemon"
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${id}.gif`}
        />
      }
    >
      <p>My name is {name}!</p>
    </Card>
  );
};

export default PokemonCard;

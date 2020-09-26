/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import "./css/PokemonCard.css";
import { getPokemonProps } from "../../../selectors/getPokemonProps";
import { PokemonStats } from "./PokemonStats";
import { PokemonData } from "./PokemonData";
export const PokemonCard = ({ data, disableLink = false }) => {
  const pokemon = getPokemonProps(data);

  return (
    <div className="w-full flex pokemon-card flex-col items-center">
      <PokemonData pokemon={pokemon} disableLink={disableLink} />
      <PokemonStats pokemon={pokemon} />
    </div>
  );
};

import React from "react";
import { ProgressBar } from "./ProgressBar";

export const PokemonStats = ({ pokemon }) => {
  return (
    <div className="stats grid w-full">
      {pokemon.stats
        .map(({ base_stat, stat: { name } }, index) => (
          <ProgressBar key={name} name={name} baseStat={base_stat} />
        ))
        .reverse()}
    </div>
  );
};

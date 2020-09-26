import React from "react";
import { getFormatedStr } from "../../functions/getFormatedStr";
import { getPokemonAbilities } from "../../functions/getPokemonAbilities";
import { getPokemonGeneration } from "../../functions/getPokemonGeneration";

export const PokemonLabels = ({ data }) => {
  return (
    <>
      <h2>
        Habitat:{" "}
        <span className="capitalize">
          {getFormatedStr(data.habitat) || "Unknow"}.
        </span>
      </h2>
      <h2>
        Base Experience: <span> {data.base_experience}.</span>
      </h2>
      <h2>
        Generation: <span>{getPokemonGeneration(data.generation)}.</span>
      </h2>
      {!!data.ability && (
        <h2>
          Abilities: <span>{getPokemonAbilities(data.abilities)}.</span>
        </h2>
      )}
      <h2>
        Capture rate: <span>{data.captureRate}.</span>
      </h2>
    </>
  );
};

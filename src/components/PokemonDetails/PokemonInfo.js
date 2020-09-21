import React from "react";
import { formatDescription } from "../../functions/formatDescription";
import { getFormatedStr } from "../../functions/getFormatedStr";
import { getPokemonAbilities } from "../../functions/getPokemonAbilities";
import { getPokemonGeneration } from "../../functions/getPokemonGeneration";
import { PokemonCard } from "../Home/PokemonCard/PokemonCard";

export const PokemonInfo = ({ data }) => {
  return (
    <div className="pokemon-info w-full grid">
      <PokemonCard disableLink={true} data={data} />
      <div
        style={{ borderTop: `2px solid var(--${data.types[0].type.name}) ` }}
        className="extra-info w-full flex flex-col">
        <h1
          style={{
            color: `var(--${data.types[0].type.name})`,
          }}>
          {data.genera}
        </h1>
        <p>{formatDescription(data.description)}</p>
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
        <h2>
          Abilities: <span>{getPokemonAbilities(data.abilities)}.</span>
        </h2>
      </div>
    </div>
  );
};

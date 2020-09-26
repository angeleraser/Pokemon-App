import React from "react";
import { formatDescription } from "../../functions/formatDescription";
import { getPokemonGeneration } from "../../functions/getPokemonGeneration";
import { getFallbackPokemonAppareances } from "../../selectors/getFallbackPokemonAppareances";
import { PokemonCard } from "../Home/PokemonCard/PokemonCard";
import { PokemonAppareances } from "./PokemonAppareances";
import { PokemonLabels } from "./PokemonLabels";
import { ShinySprites } from "./ShinySprites";

export const PokemonInfo = ({ data }) => {
  return (
    <div className="pokemon-info w-full animate__animated animate__slideInLeft grid">
      <PokemonCard disableLink={true} data={data} />
      <div
        style={{ borderTop: `2px solid var(--${data.types[0].type.name})` }}
        className="extra-info w-full flex flex-col">
        <h1
          style={{
            color: `var(--${data.types[0].type.name})`,
          }}>
          {data.genera}
        </h1>
        <p>{formatDescription(data.description)}</p>
        <PokemonLabels data={data} />
        {(!!data.sprites.front_shiny || !!data.sprites.back_shiny) && (
          <ShinySprites data={data} />
        )}
        {data.game_indices.length > 0 ? (
          <PokemonAppareances data={data} />
        ) : (
          <PokemonAppareances
            data={getFallbackPokemonAppareances(
              getPokemonGeneration(data.generation)
            )}
          />
        )}
      </div>
    </div>
  );
};

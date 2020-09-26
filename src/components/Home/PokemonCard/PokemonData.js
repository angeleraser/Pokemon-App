import React from "react";
import { useHistory } from "react-router";
import { getFormatedStr } from "../../../functions/getFormatedStr";
import { getFormatedUnity } from "../../../functions/getFormatedUnity";
import { CatchButton } from "./CatchButton";
import { Pokeball } from "./Pokeball";
import { PokemonSprite } from "./PokemonSprite";
import { PokemonTypes } from "./PokemonTypes";

export const PokemonData = ({ pokemon, disableLink }) => {
  const { push: historyPush } = useHistory();
  const pokemonIsCurrentlyCatched = localStorage.getItem("catchedPokemon")
    ? JSON.parse(localStorage.getItem("catchedPokemon")).some(
        (name) => name === pokemon.name
      )
    : pokemon.isCatched;
  return (
    <div
      className={`data animate__animated animate__slideInLeft w-full flex flex-col items-center justify-end ${
        !disableLink ? "pointer" : ""
      }`}>
      {!pokemonIsCurrentlyCatched && !pokemon.isCatched ? (
        <CatchButton pokemonName={pokemon.name} />
      ) : (
        <Pokeball />
      )}
      {/* Height  */}
      <span className="height boder-circle">
        {getFormatedUnity(pokemon.height, "height")}
      </span>
      {/* Weight  */}
      <span className="weight boder-circle">
        {getFormatedUnity(pokemon.weight, "weight")}
      </span>
      <div
        onClick={() => {
          !disableLink && historyPush(`/pokemon/${pokemon.name}`);
        }}
        className="pokemon-img-id w-full relative">
        <PokemonSprite pokemon={pokemon} />
        <p className="id">#{pokemon.id}</p>
      </div>
      {/* Name  */}
      <h2 className="z-40">{getFormatedStr(pokemon.name)}</h2>
      <PokemonTypes pokemon={pokemon} />
      <p className="ability">
        {getFormatedStr(pokemon.abilities[0]?.ability.name)}
      </p>
    </div>
  );
};

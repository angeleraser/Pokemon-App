/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useContext } from "react";
import { useHistory } from "react-router";
import { PokemonContext } from "../../PokemonContext/PokemonContext";
import { getPokemonProps } from "../../selectors/getPokemonProps";
import { types } from "../../types/types";
import { PokemonSprite } from "../Home/PokemonCard/PokemonSprite";
const PokemonItem = ({ pokemonData }) => {
  const pokemon = getPokemonProps(pokemonData);
  const { arenaDispatch } = useContext(PokemonContext);
  const history = useHistory();
  return (
    <div
      onClick={() => {
        arenaDispatch({ type: types.disableArena });
        history.replace(`/pokemon/${pokemon.name}`);
      }}
      className="pokemon-item">
      {!!pokemon && <PokemonSprite pokemon={pokemon} />}
    </div>
  );
};

export default PokemonItem;

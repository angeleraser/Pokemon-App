import React from "react";
import { useContext } from "react";
import { PokemonContext } from "../../../PokemonContext/PokemonContext";
import { types } from "../../../types/types";
export const TypeButton = ({ type }) => {
  const {
    dispatch,
    state: {
      homePage: { selected, pokemonTypes, currentPokemon, status },
    },
  } = useContext(PokemonContext);
  const filterPokemonsByType = ({ target: { textContent } }) => {
    currentPokemon.type !== type &&
      dispatch({
        type: types.selectType,
        payload: pokemonTypes.find((pokemon) => pokemon.type === textContent),
      });
  };
  return (
    <button
      disabled={!!status.fetchError || !!status.currentAction}
      className={`${selected.type === type ? "active" : ""} ${
        !!status.fetchError || !!status.currentAction ? "disabled" : ""
      }`}
      onClick={filterPokemonsByType}
      style={{
        color: `${selected.type === type ? "#fff" : `var(--${type})`}`,
        backgroundColor: `${
          selected.type === type ? `var(--${type})` : `var(--btn-bg)`
        }`,
      }}>
      {type}
    </button>
  );
};

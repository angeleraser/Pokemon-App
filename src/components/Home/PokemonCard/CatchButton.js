import React from "react";
import { useContext } from "react";
import { useHistory } from "react-router";
import { findPokemon } from "../../../functions/findPokemon";
import { getConcatenatedArr } from "../../../functions/getConcatenatedArr";
import { PokemonContext } from "../../../PokemonContext/PokemonContext";
import { types } from "../../../types/types";

export const CatchButton = ({ pokemonName }) => {
  const {
    dispatch,
    state: {
      global: { allFetchedPokemon },
      detailsPage,
    },
  } = useContext(PokemonContext);
  const history = useHistory();
  return (
    <button
      onClick={() => {
        history.push(`/arena/${pokemonName}`);
        dispatch({ type: types.enableArena });
        const pokemonInGlobalList = allFetchedPokemon.length
          ? findPokemon(
              getConcatenatedArr(
                allFetchedPokemon.map((item) => item.pokemonList)
              ),
              pokemonName
            )
          : null;
        const pokemonInDetailsPageList = findPokemon(
          detailsPage.pokemonList,
          pokemonName
        );
        dispatch({
          type: types.setArenaPokemon,
          payload: pokemonInGlobalList || pokemonInDetailsPageList,
        });
      }}
      className="absolute catch-btn">
      Catch
    </button>
  );
};

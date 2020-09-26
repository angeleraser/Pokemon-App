import React from "react";
import { useContext } from "react";
import { delay } from "../../../functions/delay";
import { PokemonContext } from "../../../PokemonContext/PokemonContext";
import { getAllPokemonByType } from "../../../selectors/getAllPokemonByType";
import { homeStatus } from "../../../status/status";
import { types } from "../../../types/types";
export const TypeButton = ({ type }) => {
  const {
    dispatch,
    state: {
      homePage: { selected, pokemonTypes, status },
      global,
    },
  } = useContext(PokemonContext);
  const filterPokemonsByType = ({ target: { textContent } }) => {
    if (selected.type !== type) {
      // Resets the list
      dispatch({ type: types.updateCurrentList, payload: [] });
      // Update the Home status
      dispatch({
        type: types.updateHomeStatus,
        payload: {
          current: homeStatus.updatePokemonList,
          disableActions: true,
          error: null,
          isFetching: false,
        },
      });
      //  Dispatch to select the pokemon type to be rendered
      delay(() => {
        dispatch({
          type: types.selectType,
          payload: getAllPokemonByType(global.allFetchedPokemon, textContent) || {
            ...getAllPokemonByType(pokemonTypes, textContent),
            loaded: [],
          }, //if the pokemon list is not fetched
        });
        dispatch({
          type: types.updateHomeStatus,
          payload: {
            current: null,
            disableActions: false,
            error: null,
            isFetching: false,
          },
        });
      }, 1000);
    }
  };
  return (
    <button
      disabled={status.disableActions}
      className={`${selected.type === type ? "active" : ""} ${
        status.disableActions ? "disabled" : ""
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

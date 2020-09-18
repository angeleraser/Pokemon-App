/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect } from "react";
import "./css/PokemonList.css";
import { PokemonCard } from "../PokemonCard/PokemonCard";
import { useContext } from "react";
import { PokemonContext } from "../../../PokemonContext/PokemonContext";
import { types } from "../../../types/types";
import { LoadingPokeball } from "../../LoadingPokeball/LoadingPokeball";
import { usePokemon } from "../../hooks/usePokemon";
import { homeStatus } from "../../../status/status";
const PokemonList = () => {
  const {
    state: {
      homePage: { selected, currentPokemon, status },
      global: { allFetchedPokemon },
    },
    dispatch,
  } = useContext(PokemonContext);
  const [getPokemonList] = usePokemon();
  const [
    { response, error: fetchPokemonListError },
    fetchPokemonList,
  ] = getPokemonList(selected.pokemonListToFetch);

  // Fetch Pokemon by the selected type
  useEffect(() => {
    if (
      selected.type.length &&
      allFetchedPokemon.every(({ type: name }) => name !== selected.type)
    ) {
      fetchPokemonList();
      // Update Home status when is fetching the pokemon list
      dispatch({
        type: types.updateHomeStatus,
        payload: {
          currentAction: homeStatus.fetchingPokemonList,
          fetchError: null,
        },
      });
    }
  }, [selected, allFetchedPokemon]);

  // Save pokemon in global list
  useEffect(() => {
    if (!!response) {
      dispatch({
        type: types.savePokemon,
        payload: {
          type: selected.type,
          pokemonList: [...response],
        },
      });
    } else {
      dispatch({
        type: types.updatePokemonList,
        payload: {
          type: "",
          list: [],
        },
      });
    }
  }, [response]);

  // Update the current pokemon list to show
  useEffect(() => {
    if (
      allFetchedPokemon.some(
        (pokemonList) => pokemonList.type === selected.type
      )
    ) {
      // Resets the current pokemon list to clean web browser cache
      dispatch({
        type: types.updatePokemonList,
        payload: {
          type: "",
          list: [],
        },
      });
      // Disable the types button while is updating the pokemon list 
      dispatch({
        type: types.updateHomeStatus,
        payload: {
          currentAction: homeStatus.updatePokemonList,
          fetchError: null,
        },
      });
      setTimeout(() => {
        dispatch({
          type: types.updatePokemonList,
          payload: {
            type: selected.type,
            list: allFetchedPokemon.find(
              (pokemonList) => pokemonList.type === selected.type
            ).pokemonList,
          },
        });
        dispatch({
          type: types.updateHomeStatus,
          payload: {
            currentAction: null,
            fetchError: null,
          },
        });
      }, 500);
    }
  }, [selected, allFetchedPokemon]);

  // Set an error if pokemon list cannot be fetched
  useEffect(() => {
    !!fetchPokemonListError &&
      dispatch({
        type: types.updateHomeStatus,
        payload: {
          currentAction: null,
          fetchError: homeStatus.failedInFetchPokemonList,
        },
      });
  }, [fetchPokemonListError]);

  return (
    <section className="w-full pokemon-list grid">
      {currentPokemon.list.length ? (
        currentPokemon.list.map((data, i) => (
          <PokemonCard key={i} data={data} />
        ))
      ) : (
        <LoadingPokeball
          error={status.fetchError}
          fetchAction={() => {
            if (status.fetchError === homeStatus.failedInFetchPokemonList) {
              fetchPokemonList();
            }
          }}
        />
      )}
    </section>
  );
};

export default PokemonList;

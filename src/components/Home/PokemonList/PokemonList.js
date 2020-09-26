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
import { getItemsToLoad } from "../../../selectors/getItemsToLoad";
import { LoadingSpin } from "../../LoadingSpin/LoadingSpin";
const PokemonList = () => {
  const {
    state: {
      homePage: {
        selected: { loaded, totalPokemon, type },
        status,
        currentList,
      },
    },

    dispatch,
  } = useContext(PokemonContext);
  const [getPokemonList] = usePokemon();
  const [
    { response, error: fetchPokemonListError },
    fetchPokemonList,
  ] = getPokemonList(getItemsToLoad(25, loaded.length, totalPokemon));

  // Fetch Pokemon by the selected type
  useEffect(() => {
    if (loaded.length === 0 && type.length) {
      fetchPokemonList();
      // Update Home status while is fetching
      dispatch({
        type: types.updateHomeStatus,
        payload: {
          current: homeStatus.fetchingPokemonList,
          disableActions: true,
          error: null,
          isFetching: true,
        },
      });
    }
  }, [type, loaded]);

  // Save the pokemon List
  useEffect(() => {
    if (!!response) {
      const pokemonListToUpdate = {
        type,
        totalPokemon,
        loaded: [...loaded, ...response], // save pokemon fetched
      };
      // Update the current pokemon list
      dispatch({
        type: types.updatePokemonList,
        payload: pokemonListToUpdate,
      });
      // Store the pokemon in global list
      dispatch({
        type: types.savePokemonInGlobalList,
        payload: pokemonListToUpdate,
      });
      // Update home status
      dispatch({
        type: types.updateHomeStatus,
        payload: {
          ...status,
          current: null,
          isFetching: false,
          disableActions: false,
        },
      });
    }
  }, [response]);

  // Update current pokemon list to show
  useEffect(() => {
    dispatch({ type: types.updateCurrentList, payload: loaded });
  }, [loaded]);

  // Set an error if the pokemon list cannot be fetched :(
  useEffect(() => {
    !!fetchPokemonListError &&
      dispatch({
        type: types.updateHomeStatus,
        payload: {
          current: homeStatus.failedInFetchPokemonList,
          disableActions: true,
          error: homeStatus.failedInFetchPokemonList,
          isFetching: false,
        },
      });
  }, [fetchPokemonListError]);

  // Clean pokemon list when the component is unmounted
  useEffect(() => {
    return () => {
      dispatch({ type: types.updateCurrentList, payload: [] });
    };
  }, []);

  return (
    <section className="w-full pokemon-list grid">
      {!!currentList.length && !!!!status ? (
        <>
          {currentList.map((data, i) => (
            <PokemonCard key={i} data={data} />
          ))}
          {loaded.length < totalPokemon.length &&
            (status.current !== homeStatus.loadingMorePokemon ? (
              <button
                onClick={() => {
                  fetchPokemonList();
                  dispatch({
                    type: types.updateHomeStatus,
                    payload: {
                      current: homeStatus.loadingMorePokemon,
                      disableActions: true,
                      error: null,
                      isFetching: false,
                    },
                  });
                }}
                className="load-more-button">
                {" "}
                Load more
              </button>
            ) : (
              <LoadingSpin />
            ))}
        </>
      ) : (
        <LoadingPokeball
          error={status.error}
          fetchAction={() => {
            if (status.error === homeStatus.failedInFetchPokemonList) {
              fetchPokemonList();
              dispatch({
                type: types.updateHomeStatus,
                payload: {
                  current: homeStatus.fetchingPokemonList,
                  disableActions: true,
                  isFetching: true,
                  error: null,
                },
              });
            } else {
              dispatch({
                type: types.updateHomeStatus,
                payload: {
                  current: homeStatus.fetchPokemonTypesAgain,
                  disableActions: true,
                  isFetching: true,
                  error: null,
                },
              });
            }
          }}
        />
      )}
    </section>
  );
};

export default PokemonList;

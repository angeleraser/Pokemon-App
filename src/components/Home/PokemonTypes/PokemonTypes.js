/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React from "react";
import "./css/PokemonTypes.css";
import { TypeButton } from "./TypeButton";
import { useEffect } from "react";
import { useContext } from "react";
import { PokemonContext } from "../../../PokemonContext/PokemonContext";
import { types } from "../../../types/types";
import { useMemo } from "react";
import { LoadingPokemonTypes } from "./LoadingPokemonTypes";
import { usePokemon } from "../../hooks/usePokemon";
import { homeStatus } from "../../../status/status";
export const PokemonTypes = () => {
  const {
    state: {
      homePage: { pokemonTypes, status, shouldFetchData },
    },
    dispatch,
  } = useContext(PokemonContext);
  const [, getAllPokemonTypes] = usePokemon();
  const [
    { response, error: fetchPokemonTypesError },
    fetchPokemonTypes,
  ] = getAllPokemonTypes("https://pokeapi.co/api/v2/type");

  // Fetch pokemon types
  useEffect(() => {
    if (!pokemonTypes.length & shouldFetchData) {
      fetchPokemonTypes();
      dispatch({
        type: types.updateHomeStatus,
        payload: {
          currentAction: homeStatus.fetchingPokemonTypes,
          fetchError: null,
        },
      });
    }
  }, []);

  // Save the pokemon types an set a default type to show when the app is loaded
  useEffect(() => {
    if (!!response) {
      dispatch({ type: types.savePokemonTypes, payload: response });
      dispatch({ type: types.selectType, payload: response[0] }); // Normal type
      // Back Home status to initial state
      dispatch({
        type: types.updateHomeStatus,
        payload: {
          currentAction: null,
          fetchError: null,
        },
      });
    }
  }, [response, dispatch]);

  // Set an error if pokemon list cannot be fetched
  useEffect(() => {
    !!fetchPokemonTypesError &&
      dispatch({
        type: types.updateHomeStatus,
        payload: {
          currentAction: null,
          fetchError: homeStatus.failedInFetchPokemonTypes,
        },
      });
  }, [fetchPokemonTypesError]);

  // Fetch pokemon list again
  useEffect(() => {
    if (
      status.currentAction === homeStatus.fetchPokemonTypesAgain &&
      !pokemonTypes.length
    ) {
      fetchPokemonTypes();
    }
  }, [status]);

  const names = useMemo(() => {
    return pokemonTypes.filter(
      ({ pokemonListToFetch }) => pokemonListToFetch.length > 0
    );
  }, [pokemonTypes]);

  return (
    <section className="w-full list-wrapper flex-col flex items-center">
      {!!pokemonTypes.length ? (
        <div className={`w-full types-list`}>
          {names.map(({ type }) => (
            <TypeButton key={type} type={type} />
          ))}
        </div>
      ) : (
        <LoadingPokemonTypes />
      )}
    </section>
  );
};

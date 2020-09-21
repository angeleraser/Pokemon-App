/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useContext } from "react";
import { useMemo } from "react";
import { useEffect } from "react";
import { delay } from "../../functions/delay";
import { findPokemon } from "../../functions/findPokemon";
import { getConcatenatedArr } from "../../functions/getConcatenatedArr";
import { verifyExistence } from "../../functions/verifyExistence";
import { PokemonContext } from "../../PokemonContext/PokemonContext";
import { types } from "../../types/types";
import { usePokemon } from "../hooks/usePokemon";
import { LoadingPokeball } from "../LoadingPokeball/LoadingPokeball";
import { BackButton } from "./BackButton";
import "./css/Details.css";
import { PokemonInfo } from "./PokemonInfo";
export const DetailsScreen = ({
  match: {
    params: { pokemon: pokemonToFetch },
  },
}) => {
  const [, , getPokemonInfo] = usePokemon();
  const [{ response, error }, fetchPokemonInfo] = getPokemonInfo(
    `https://pokeapi.co/api/v2/pokemon/${pokemonToFetch}`
  );
  const {
    state: {
      global: { allFetchedPokemon },
      detailsPage,
    },
    dispatch,
  } = useContext(PokemonContext);
  const globalPokemonList = useMemo(
    () =>
      allFetchedPokemon.length
        ? getConcatenatedArr(allFetchedPokemon.map((item) => item.pokemonList))
        : [],
    [allFetchedPokemon]
  );

  // Fetch the pokemon if not exists in the global pokemon list
  useEffect(() => {
    if (
      !verifyExistence(globalPokemonList, pokemonToFetch) &&
      !verifyExistence(detailsPage.pokemonList, pokemonToFetch)
    ) {
      fetchPokemonInfo();
    } else {
      dispatch({ type: types.setPokemonDetails, payload: null });
      delay(
        () =>
          dispatch({
            type: types.setPokemonDetails,
            payload:
              findPokemon(globalPokemonList, pokemonToFetch) ||
              findPokemon(detailsPage.pokemonList, pokemonToFetch),
          }),
        1000
      );
    }
  }, [pokemonToFetch, allFetchedPokemon]);
  // Save the pokemon in the details page pokemon list
  useEffect(() => {
    if (!!response) {
      dispatch({ type: types.savePokemonListDetails, payload: response });
      delay(
        () =>
          dispatch({
            type: types.setPokemonDetails,
            payload: response,
          }),
        1000
      );
    }
  }, [response, dispatch]);
  return (
    <div className="w-full pokemon-details flex flex-col">
      {!!detailsPage.currentPokemon ? (
        <>
          <BackButton />
          <PokemonInfo data={detailsPage.currentPokemon} />
        </>
      ) : (
        <LoadingPokeball
          error={error}
          fetchAction={() => {
            fetchPokemonInfo();
            dispatch({ type: types.setPokemonDetails, payload: null }); // resets the pokemon details to show loading animation
          }}
        />
      )}
    </div>
  );
};

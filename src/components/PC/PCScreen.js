/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import PokemonItem from "./PokemonItem";
import "./css/PCScreen.css";
import { useContext } from "react";
import { PokemonContext } from "../../PokemonContext/PokemonContext";
import { useEffect } from "react";
import { usePokemon } from "../hooks/usePokemon";
import { types } from "../../types/types";
const PCScreen = () => {
  const {
    state: { pc },
    dispatch,
  } = useContext(PokemonContext);
  const [getPokemonList] = usePokemon();
  const catchedPokemonURL = localStorage.getItem("catchedPokemon")
    ? JSON.parse(localStorage.getItem("catchedPokemon")).map(
        ({ name }) => `https://pokeapi.co/api/v2/pokemon/${name}`
      )
    : [];

  const [{ response }, fetchPokemonList] = getPokemonList(catchedPokemonURL);

  // Fetch pokemon list stored
  useEffect(() => {
    if (!pc.pokemonList.length && catchedPokemonURL.length > 0) {
      fetchPokemonList();
    }
  }, []);

  // Update the pokemon list
  useEffect(() => {
    !!response &&
      response.length > 0 &&
      dispatch({ type: types.updatePokemonSavedInPC, payload: response });
  }, [response]);

  // Store catched pokemon names in localStorage
  useEffect(() => {
    if (pc.pokemonList.length > 0) {
      localStorage.setItem(
        "catchedPokemon",
        JSON.stringify([...pc.pokemonList])
      );
    }
  }, [pc]);

  return (
    <div className="w-full pc-screen items-center flex flex-col">
      <h2 className="w-full">Box 1</h2>
      <div className="pokemon-wrapper">
        {pc.pokemonList.map((pokemon) => (
          <PokemonItem key={pokemon.name} pokemonData={pokemon} />
        ))}
      </div>
    </div>
  );
};

export default PCScreen;

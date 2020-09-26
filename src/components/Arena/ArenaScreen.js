/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useContext } from "react";
import { PokemonContext } from "../../PokemonContext/PokemonContext";
import { getPokemonProps } from "../../selectors/getPokemonProps";
import "./css/Arena.css";
import { Pokemon } from "./Pokemon";
import { Pokeball } from "./Pokeball";
import { useFetch } from "../hooks/useFetch";
import { useState } from "react";
import { calcPercentage } from "../../functions/calcPercentage";
import { getPokemonHPBarColor } from "../../functions/getPokemonHPBarColor";
import { types } from "../../types/types";
import { delay } from "../../functions/delay";
import { gotchaSvg } from "../../svg-icons";
export const ArenaScreen = () => {
  const {
    arena: { currentPokemon },
    arenaDispatch,
  } = useContext(PokemonContext);
  const pokemon = getPokemonProps(currentPokemon);
  const [{ data: imageURL }, fetchPokemonImage] = useFetch();
  const [pokeballState, setPokeballState] = useState({
    success: false,
    isThrow: false,
    error: false,
  });
  const [pokemonState, setPokemonState] = useState({
    maxHP: pokemon.stats[0].base_stat,
    currentHP: pokemon.stats[0].base_stat,
  });
  const attactPokemon = () => {
    if (!pokeballState.isThrow && !pokeballState.success) {
      if (pokemonState.currentHP <= 20) {
        setPokemonState((prev) => ({
          ...prev,
          currentHP: prev.currentHP - Math.ceil(Math.random() * 10),
        }));
      } else {
        setPokemonState((prev) => ({
          ...prev,
          currentHP:
            prev.currentHP - Math.round((Math.random() * prev.maxHP) / 2),
        }));
      }
    }
  };
  useEffect(() => {
    if (pokemonState.currentHP <= 0) {
      delay(() => arenaDispatch({ type: types.disableArena }), 1000);
    }
  }, [pokemonState]);
  // Fetch pokemon image if the pokemon.image or pokemon.front_default is null
  useEffect(() => {
    if (pokemon.forms.length) {
      if (!!!pokemon.front_default && !!!pokemon.image) {
        fetchPokemonImage(pokemon.forms[0].url);
      }
    }
  }, []);
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(black, var(--${pokemon.types[0].type.name}))`,
      }}
      className="w-full relative flex arena-wrapper items-center flex-col">
      <div className="pokemon-place relative flex w-full items-center justify-center">
        {" "}
        <div className="circle"></div>
        {pokeballState.success && gotchaSvg}
        <div className="pokemon-hp-wrapper flex items-center">
          HP
          <div className="pokemon-hp w-full">
            <div
              style={{
                backgroundImage: `${getPokemonHPBarColor(
                  calcPercentage(pokemonState.currentHP, pokemonState.maxHP)
                )}`,
                width: `${
                  pokemonState.currentHP <= 0
                    ? "0"
                    : calcPercentage(pokemonState.currentHP, pokemonState.maxHP)
                }%`,
              }}
              className="bar w-full"></div>
          </div>
        </div>
        <Pokemon
          arenaContext={{ pokeballState, setPokeballState, pokemonState }}
          pokemon={{ ...pokemon, imageURL }}
        />
      </div>
      <div className="pokeballs-stack flex items-center absolute">
        <Pokeball arenaContext={{ pokeballState, setPokeballState }} />
      </div>
      {!pokeballState.success && (
        <button onClick={attactPokemon} className="attack">
          Attack
        </button>
      )}
    </div>
  );
};

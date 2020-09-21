
import React, { useEffect } from "react";
import { useContext } from "react";
import { PokemonContext } from "../../PokemonContext/PokemonContext";
import { getPokemonProps } from "../../selectors/getPokemonProps";
import "./css/Arena.css";
import { Pokemon } from "./Pokemon";
import { Pokeball } from "./Pokeball";
import { useFetch } from "../hooks/useFetch";
import { useState } from "react";
import { types } from "../../types/types";
export const ArenaScreen = () => {
  const {
    state: {
      arena: { currentPokemon },
    },
    dispatch,
  } = useContext(PokemonContext);
  const pokemon = getPokemonProps(currentPokemon);
  const [{ data: imageURL }, fetchPokemonImage] = useFetch();
  const [state, setState] = useState({
    pokeball: {
      success: false,
      isThrow: false,
      error: false,
    },
  });
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
        <Pokemon
          arenaContext={{ state, setState }}
          pokemon={{ ...pokemon, imageURL }}
        />
      </div>
      <div className="pokeballs-stack flex items-center absolute">
        <Pokeball arenaContext={{ state, setState }} />
      </div>
    </div>
  );
};

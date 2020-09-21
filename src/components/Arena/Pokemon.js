/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router";
import { delay } from "../../functions/delay";
import { getSuccesRate } from "../../functions/getSucessRate";
import { PokemonContext } from "../../PokemonContext/PokemonContext";
import { types } from "../../types/types";
import { pokemonAnimations } from "./animations";
export const Pokemon = ({ pokemon, arenaContext }) => {
  const [animation, setAnimation] = useState({});
  const history = useHistory();
  const {
    state: {
      arena: { currentPokemon },
    },
    dispatch,
  } = useContext(PokemonContext);
  const {
    state: { pokeball },
    setState,
  } = arenaContext;
  const catchPokemon = (isCatch) => {
    setState({
      pokeball: {
        isThrow: false,
        success: isCatch,
        error: !isCatch,
      },
    });
  };

  useEffect(() => {
    switch (true) {
      case pokeball.isThrow:
        delay(() => setAnimation(pokemonAnimations.shrink), 800);
        delay(() => catchPokemon(getSuccesRate(pokemon.captureRate)), 5000);
        break;
      case pokeball.success:
        delay(() => {
          dispatch({ type: types.savePokemonInPC, payload: currentPokemon });
          dispatch({ type: types.disableArena });
          history.replace("/pc");
        }, 2000);
        break;
      case pokeball.error:
        setAnimation(pokemonAnimations.grow);
        break;
      default:
        break;
    }
  }, [pokeball]);

  useEffect(() => {
    if (pokeball.success) {
      console.log("Pokemon Captured!");
    }
  }, [pokeball]);

  return (
    <div style={{ ...animation }} className="pokemon-body absolute">
      <img
        alt="pokemon"
        src={
          pokemon.dreamWorld ||
          pokemon.officialArtwork ||
          pokemon.front_default ||
          pokemon.icons.front_default ||
          pokemon.imageURL?.sprites.front_default
        }
      />
    </div>
  );
};

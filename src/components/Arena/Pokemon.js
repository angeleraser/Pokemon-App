/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router";
import { calcPercentage } from "../../functions/calcPercentage";
import { delay } from "../../functions/delay";
import { pokemonIsCatched } from "../../functions/pokemonIsCatched";
import { PokemonContext } from "../../PokemonContext/PokemonContext";
import { types } from "../../types/types";
import { PokemonSprite } from "../Home/PokemonCard/PokemonSprite";
import { pokemonAnimations } from "./animations";

export const Pokemon = ({ pokemon, arenaContext }) => {
  const [animation, setAnimation] = useState({});
  const sendPokemoToPC = () => {
    dispatch({ type: types.savePokemonInPC, payload: currentPokemon });
    dispatch({ type: types.catchPokemon, payload: currentPokemon.name });
    arenaDispatch({ type: types.disableArena });
    history.replace("/pc");
  };
  const history = useHistory();
  const {
    arena: { currentPokemon },
    dispatch,
    arenaDispatch,
  } = useContext(PokemonContext);
  const {
    pokeballState,
    setPokeballState,
    pokemonState: { currentHP, maxHP },
  } = arenaContext;
  const catchPokemon = (isCatch) => {
    setPokeballState({
      isThrow: false,
      success: isCatch,
      error: !isCatch,
    });
  };
  useEffect(() => {
    switch (true) {
      case pokeballState.isThrow:
        delay(() => setAnimation(pokemonAnimations.shrink), 800);
        delay(
          () =>
            catchPokemon(
              pokemonIsCatched(
                currentPokemon.captureRate,
                calcPercentage(currentHP, maxHP)
              )
            ),
          6000
        );
        break;
      case pokeballState.success:
        delay(sendPokemoToPC, 3000);
        break;
      case pokeballState.error:
        setAnimation(pokemonAnimations.grow);
        break;
      default:
        break;
    }
  }, [pokeballState]);

  useEffect(() => {
    if (currentHP <= 0) {
      setAnimation(pokemonAnimations.shrink);
    }
  }, [currentHP]);

  return (
    <div style={{ ...animation }} className="pokemon-body absolute">
      <PokemonSprite pokemon={pokemon} />
    </div>
  );
};

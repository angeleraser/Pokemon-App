/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState } from "react";
import { useRef } from "react";
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
  const pokeballSuccessSound = useRef(null);
  const pokeballErrorSound = useRef(null);
  const [animation, setAnimation] = useState({});
  const sendPokemoToPC = () => {
    dispatch({ type: types.savePokemonInPC, payload: currentPokemon });
    dispatch({ type: types.catchPokemon, payload: currentPokemon.name });
    arenaDispatch({ type: types.disableArena });
    history.replace("/pc");
  };
  const playPokeballSuccessSound = () => {
    const sound = pokeballSuccessSound.current;
    sound.currentTime = 0;
    sound.play();
    sound.addEventListener("ended", sendPokemoToPC);
  };
  const playPokeballErrorSound = () => {
    pokeballErrorSound.current.currentTime = 0.45;
    pokeballErrorSound.current.play();
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
        playPokeballSuccessSound();
        break;
      case pokeballState.error:
        playPokeballErrorSound();
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
      <audio
        id="pokeball-success-sound"
        ref={pokeballSuccessSound}
        src="/sounds/pokeball-success.mp3"></audio>
      <audio
        id="pokeball-error-sound"
        ref={pokeballErrorSound}
        src="/sounds/pokeball-error.mp3"></audio>
    </div>
  );
};

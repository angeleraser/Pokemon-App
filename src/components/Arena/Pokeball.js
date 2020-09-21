// /* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { delay } from "../../functions/delay";
import { PokemonContext } from "../../PokemonContext/PokemonContext";
import { types } from "../../types/types";
import { pokeballAnimations } from "./animations";
export const Pokeball = ({ arenaContext }) => {
  const {
    state: { pokeball },
    setState,
  } = arenaContext;
  const [animation, setAnimation] = useState({});
  useEffect(() => {
    switch (true) {
      case pokeball.isThrow:
        setAnimation(pokeballAnimations.throw);
        delay(() => setAnimation(pokeballAnimations.shake), 1200);
        break;
      case pokeball.success:
        setAnimation(pokeballAnimations.success);
        break;
      case pokeball.error:
        setAnimation(pokeballAnimations.initial);
        break;
      default:
        break;
    }
  }, [pokeball]);
  return (
    <div
      onClick={() => {
        if (!pokeball.isThrow && !pokeball.success) {
          setState({
            pokeball: {
              isThrow: true,
              success: false,
              error: false,
            },
          });
        }
      }}
      style={{ ...animation }}
      className={`pokeball ${pokeball.success ? "success" : ""}`}>
      <div className="pokeball__button"></div>
    </div>
  );
};

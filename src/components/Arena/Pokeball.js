// /* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { delay } from "../../functions/delay";
import { pokeballAnimations } from "./animations";
export const Pokeball = ({ arenaContext }) => {
  const pokeballThrowSound = useRef(null);
  const playPokeballCatchingSound = () => {
    const catchingSound = pokeballThrowSound.current;
    catchingSound.currentTime = 1.6;
    const catchingInterval = setInterval(() => {
      catchingSound.currentTime = 1.6;
      catchingSound.play();
    }, 1500);
    delay(() => clearInterval(catchingInterval), 6000);
  };
  const { pokeballState, setPokeballState } = arenaContext;
  const [animation, setAnimation] = useState({});
  useEffect(() => {
    switch (true) {
      case pokeballState.isThrow:
        setAnimation(pokeballAnimations.throw);
        delay(() => setAnimation(pokeballAnimations.shake), 1200);
        break;
      case pokeballState.success:
        setAnimation(pokeballAnimations.success);
        break;
      case pokeballState.error:
        setAnimation(pokeballAnimations.initial);
        break;
      default:
        break;
    }
  }, [pokeballState]);
  return (
    <div
      onClick={() => {
        if (!pokeballState.isThrow && !pokeballState.success) {
          setPokeballState({
            isThrow: true,
            success: false,
            error: false,
          });
          playPokeballCatchingSound()
        }
      }}
      style={{ ...animation }}
      className={`pokeball ${pokeballState.success ? "success" : ""}`}>
      <div className="pokeball__button"></div>
      <audio ref={pokeballThrowSound} src="/sounds/pokeball-throw.mp3"></audio>
    </div>
  );
};

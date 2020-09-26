import { createContext } from "react";
import React from "react";
import { useReducer } from "react";
import { initialState, pokemonReducer } from "./pokemonReducer";
import { arenaReducer, arenaState } from "./arenaReducer";
export const PokemonContext = createContext();
export const AppContext = (({ children }) => {
  const [state, dispatch] = useReducer(pokemonReducer, initialState);
  const [arena, arenaDispatch] = useReducer(arenaReducer, arenaState);
  const providerValue = {
    state,
    dispatch,
    arena,
    arenaDispatch,
  };
  return (
    <PokemonContext.Provider value={providerValue}>
      {children}
    </PokemonContext.Provider>
  );
});

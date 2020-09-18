import { createContext } from "react";
import React from "react";
import { useReducer } from "react";
import { initialState, pokemonReducer } from "./pokemonReducer";
export const PokemonContext = createContext();
export const AppContext = ({ children }) => {
  const [state, dispatch] = useReducer(pokemonReducer, initialState);
  const providerValue = { state, dispatch };
  return (
    <PokemonContext.Provider value={providerValue}>
      {children}
    </PokemonContext.Provider>
  );
};

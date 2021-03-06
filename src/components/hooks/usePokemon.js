import { usePokemonInfo } from "./usePokemonInfo";
import { usePokemonList } from "./usePokemonList";
import { usePokemonTypes } from "./usePokemonTypes";

export const usePokemon = () => {
  return [usePokemonList, usePokemonTypes, usePokemonInfo];
};

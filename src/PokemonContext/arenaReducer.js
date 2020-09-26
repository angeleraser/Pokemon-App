import { types } from "../types/types";

export const arenaState = {
  enabled: false,
  currentPokemon: null,
};

export const arenaReducer = (state, action) => {
  switch (action.type) {
    case types.enableArena:
      return {
        ...state,
        enabled: true,
        currentPokemon: null,
      };
    case types.disableArena:
      return {
        ...state,
        enabled: false,
      };
    case types.setArenaPokemon:
      return {
        ...state,
        currentPokemon: action.payload,
      };
    default:
      return state;
  }
};

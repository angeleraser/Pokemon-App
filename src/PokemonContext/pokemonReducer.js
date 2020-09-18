import { types } from "../types/types";
export const initialState = {
  global: {
    allFetchedPokemon: [],
  },
  homePage: {
    currentPokemon: {
      list: [],
      type: "",
    },
    pokemonTypes: [],
    selected: {
      type: "",
      pokemonListToFetch: [],
    },
    status: {
      fetchError: null,
      currentAction: null,
    },
    shouldFetchData: true,
  },
};
export const pokemonReducer = (state, action) => {
  switch (action.type) {
    case types.savePokemonTypes:
      return {
        ...state,
        homePage: {
          ...state.homePage,
          pokemonTypes: action.payload,
          shouldFetchData: false,
        },
      };
    case types.selectType:
      return {
        ...state,
        homePage: {
          ...state.homePage,
          selected: {
            ...action.payload,
          },
        },
      };
    case types.savePokemon:
      return {
        ...state,
        global: {
          allFetchedPokemon: [
            ...state.global.allFetchedPokemon,
            action.payload,
          ],
        },
      };
    case types.updatePokemonList:
      return {
        ...state,
        homePage: {
          ...state.homePage,
          currentPokemon: {
            ...action.payload,
          },
        },
      };
    case types.updateHomeStatus:
      return {
        ...state,
        homePage: {
          ...state.homePage,
          status: {
            ...action.payload,
          },
        },
      };
    default:
      return state;
  }
};

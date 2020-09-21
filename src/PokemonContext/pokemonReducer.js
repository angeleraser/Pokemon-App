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
  detailsPage: {
    pokemonList: [],
    currentPokemon: null,
  },
  arena: {
    enabled: false,
    currentPokemon: null,
  },
  pc: {
    pokemonList: [],
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
    case types.savePokemonListDetails:
      return {
        ...state,
        detailsPage: {
          ...state.detailsPage,
          pokemonList: [...state.detailsPage.pokemonList, action.payload],
        },
      };
    case types.setPokemonDetails:
      return {
        ...state,
        detailsPage: {
          ...state.detailsPage,
          currentPokemon: action.payload,
        },
      };
    case types.enableArena:
      return {
        ...state,
        arena: {
          ...state.arena,
          enabled: true,
        },
      };
    case types.setArenaPokemon:
      return {
        ...state,
        arena: {
          ...state.arena,
          currentPokemon: action.payload,
        },
      };
    case types.disableArena:
      return {
        ...state,
        arena: {
          ...state.arena,
          enabled: false,
          currentPokemon: null,
        },
      };
    case types.savePokemonInPC:
      return {
        ...state,
        pc: {
          pokemonList: [...state.pc.pokemonList, action.payload],
        },
      };
    default:
      return state;
  }
};

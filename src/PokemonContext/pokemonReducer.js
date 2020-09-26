import { updatePokemonListWhenThePokemonIsCatched } from "../functions/updatePokemonList";
import { types } from "../types/types";
export const initialState = {
  global: {
    allFetchedPokemon: [],
  },
  homePage: {
    pokemonTypes: [],
    selected: {
      type: "",
      totalPokemon: [],
      loaded: [],
    },
    currentList: [],
    status: {
      current: null,
      isFetching: false,
      error: null,
      disableActions: false,
    },
    shouldFetchData: true,
  },
  detailsPage: {
    pokemonList: [],
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
    case types.savePokemonInGlobalList:
      return {
        ...state,
        global: {
          allFetchedPokemon: [
            ...state.global.allFetchedPokemon.filter(
              (pokemonList) => pokemonList.type !== action.payload.type
            ),
            action.payload,
          ],
        },
      };
    case types.updatePokemonList:
      return {
        ...state,
        homePage: {
          ...state.homePage,
          selected: {
            ...action.payload,
          },
        },
      };
    case types.updateCurrentList:
      return {
        ...state,
        homePage: {
          ...state.homePage,
          currentList: [...action.payload],
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
    case types.savePokemonInPC:
      return {
        ...state,
        pc: {
          pokemonList: [...state.pc.pokemonList, action.payload],
        },
      };
    case types.catchPokemon:
      return {
        ...state,
        global: {
          allFetchedPokemon: state.global.allFetchedPokemon.map(
            (pokemonList) => {
              return {
                ...pokemonList,
                loaded: updatePokemonListWhenThePokemonIsCatched(
                  pokemonList.loaded,
                  action.payload //pokemon name
                ),
              };
            }
          ),
        },
        homePage: {
          ...state.homePage,
          selected: {
            ...state.homePage.selected,
            loaded: updatePokemonListWhenThePokemonIsCatched(
              state.homePage.selected.loaded,
              action.payload
            ),
          },
        },
        detailsPage: {
          ...state.detailsPage,
          pokemonList: updatePokemonListWhenThePokemonIsCatched(
            state.detailsPage.pokemonList,
            action.payload //pokemon name
          ),
        },
      };
    case types.updatePokemonSavedInPC:
      return {
        ...state,
        pc: {
          pokemonList: [...state.pc.pokemonList, ...action.payload],
        },
      };
    default:
      return state;
  }
};

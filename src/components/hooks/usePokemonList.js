import { useEffect, useRef, useState } from "react";
import { useCallback } from "react";
import PropTypes from "prop-types";

const getPokemon = async (url) => {
  const data = await (await fetch(url)).json();
  return data;
};
const getAllPokemon = async (arr) => {
  const requests = arr.map(async (url) => await getPokemon(url));
  return Promise.all(requests);
};
export const usePokemonList = (pokemonList = []) => {
  const isMounted = useRef(true);

  const [{ response, loading, error }, setState] = useState({
    response: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const makeRequest = useCallback(() => {
    if (isMounted.current) {
      setState({
        // Resets the state when is fetching again
        response: null,
        loading: true,
        error: null,
      });
      console.log("Fetching pokemon list...");
      getAllPokemon(pokemonList)
        .then((resp) => {
          console.log("Fetching pokemon list completed!");
          setState({
            response: resp,
            loading: false,
            error: null,
          });
        })
        .catch((error) => {
          console.log("Error on Fetching pokemon list");
          setState({
            response: null,
            loading: false,
            error,
          });
        });
    }
  }, [pokemonList]);
  return [
    {
      response,
      loading,
      error,
    },
    makeRequest,
  ];
};
usePokemonList.propTypes = {
  pokemonList: PropTypes.array.isRequired,
};

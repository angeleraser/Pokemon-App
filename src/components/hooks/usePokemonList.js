import { useEffect, useRef, useState } from "react";
import { useCallback } from "react";
import PropTypes from "prop-types";

export const getPokemon = async (url, onError) => {
  const response = await fetch(url);
  if (response.status === 404) {
    onError && onError();
  }
  const info = await response.json();
  const {
    flavor_text_entries,
    generation,
    habitat,
    genera,
    capture_rate,
  } = await (await fetch(info.species.url)).json();
  return {
    ...info,
    description: flavor_text_entries.find((text) => text.language.name === "en")
      ?.flavor_text,
    generation: generation.name,
    habitat: habitat?.name,
    genera: genera[7]?.genus,
    captureRate: capture_rate,
    isCatched: false,
  };
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

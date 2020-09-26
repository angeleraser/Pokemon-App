import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useCallback } from "react";
import PropTypes from "prop-types";

const getPokemonListByType = async (url) => {
  const info = await (await fetch(url)).json();
  return {
    type: info.name,
    totalPokemon: info.pokemon.map(({ pokemon: { url } }) => url),
  };
};

const getAllPokemonTypes = async (url) => {
  const data = await (await fetch(url)).json();
  const requests = data.results
    .map((type) => type.url)
    .map(async (name) => await getPokemonListByType(name));
  return Promise.all(requests);
};

export const usePokemonTypes = (url = "") => {
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
    console.log("Fetching pokemon types...");
    if (isMounted.current) {
      // Reset the state 
      setState({
        response: null,
        loading: true,
        error: null,
      });
      getAllPokemonTypes(url)
        .then((resp) => {
          console.log("Fetch pokemon types completed!");
          setState({
            response: resp,
            loading: false,
            error: null,
          });
        })
        .catch((error) => {
          console.log("Failed to fetch pokemon types");
          setState({
            response: null,
            loading: false,
            error,
          });
        });
    }
  }, [url]);

  return [
    {
      response,
      loading,
      error,
    },
    makeRequest,
  ];
};

usePokemonTypes.propTypes = {
  url: PropTypes.string.isRequired,
};

import { useEffect } from "react";
import { useRef } from "react";
import { useCallback } from "react";
import { useState } from "react";
import { getPokemon } from "./usePokemonList";

export const usePokemonInfo = (URL) => {
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
    setState({
      response: null,
      loading: false,
      error: null,
    });
    console.log("Fetching pokemon details...");
    getPokemon(URL)
      .then((resp) => {
        console.log("Fetch pokemon details completed");
        if (isMounted.current) {
          setState({
            response: resp,
            loading: false,
            error: null,
          });
        }
      })
      .catch((error) => {
        console.log("Failed to fetch pokemon details");
        setState({
          response: null,
          loading: false,
          error,
        });
      });
  }, [URL]);

  return [
    {
      response,
      loading,
      error,
    },
    makeRequest,
  ];
};

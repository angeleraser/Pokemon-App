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
    if (isMounted.current) {
      console.log("Fetching pokemon details...");
      // Reset the fetch state
      setState({
        response: null,
        loading: false,
        error: null,
      });
      getPokemon(URL, () => {
        setState({
          response: null,
          loading: false,
          error: "Error 404",
        });
      })
        .then((resp) => {
          console.log("Fetch pokemon details completed");
          setState({
            response: resp,
            loading: false,
            error: null,
          });
        })
        .catch(() => {
          setState((prev) => ({
            ...prev,
            response: null,
            loading: false,
          }));
        });
    }
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

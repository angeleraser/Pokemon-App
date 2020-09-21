import { useCallback, useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";

export const useFetch = () => {
  // useRef used to manage the component when is dismounted and setState is called
  const isMounted = useRef(true);
  const unmountComponent = () => {
    isMounted.current = false;
  };
  useEffect(() => {
    return unmountComponent; //<-- prevent component dismount error when setState is called
  }, []);

  // 1- Set a initial state
  const [state, setstate] = useState({
    data: null,
    error: null,
    loading: true,
  });

  // 2- Set a effect when URL changes
  const fetchAction = useCallback((URL) => {
    //Reset the state
    setstate({
      data: null,
      loading: true,
      error: null,
    });

    // API request
    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        if (isMounted.current) {
          console.log('Image found!')
          setstate({
            data,
            error: null,
            loading: false,
          });
        } else {
          console.log("useFetch is not working...");
        }
      })
      .catch((error) => {
        // Sets error message
        setstate({
          data: null,
          loading: false,
          error,
        });
      });
  }, []); // <-- URL dependency detect when URL changes

  // 3- Return the state
  return [state, fetchAction];
};

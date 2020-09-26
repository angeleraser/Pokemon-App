/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useFetch } from "../../hooks/useFetch";

export const PokemonSprite = ({ pokemon }) => {
  const [{ data: imageURL }, fetchPokemonImage] = useFetch();
  // Fetch pokemon image if the pokemon.image or pokemon.front_default is null
  useEffect(() => {
    if (pokemon.forms.length) {
      !!!pokemon.front_default &&
        !!!pokemon.image &&
        fetchPokemonImage(pokemon.forms[0].url);
    }
  }, []);
  return (
    <img
      src={
        pokemon.dreamWorld ||
        pokemon.officialArtwork ||
        imageURL?.sprites.front_default ||
        pokemon.front_default ||
        pokemon.icons.front_default ||
        "./images/png/unknown.png"
      }
      alt={pokemon.name}
      className="z-50"
    />
  );
};

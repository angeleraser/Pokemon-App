/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { getPokemonProps } from "../../selectors/getPokemonProps";
import { useFetch } from "../hooks/useFetch";
const PokemonItem = ({ pokemonData }) => {
  const [{ data: imageURL }, fetchPokemonImage] = useFetch();
  const pokemon = getPokemonProps(pokemonData)
  // Fetch pokemon image if the pokemon.image or pokemon.front_default is null
  useEffect(() => {
    if (pokemon.forms.length) {
      !!!pokemon.front_default &&
        !!!pokemon.image &&
        fetchPokemonImage(pokemon.forms[0].url);
    }
  }, []);
  return (
    <div className="pokemon-item">
      {!!pokemon && (
        <img
          alt="pokemon"
          src={
            pokemon.dreamWorld ||
            pokemon.officialArtwork ||
            imageURL?.sprites.front_default ||
            pokemon.front_default ||
            pokemon.icons.front_default ||
            "./images/png/unknown.png"
          }></img>
      )}
    </div>
  );
};

export default PokemonItem;

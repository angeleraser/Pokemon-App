import React from "react";
// import { useEffect } from "react";
// import { useFetch } from "../hooks/useFetch";

const PokemonItem = ({data}) => {
  // useEffect(() => {
  //   fetch("https://pokeapi.co/api/v2/pokemon/pikachu");
  // }, [fetch]);
  // console.log(data);
  return (
    <div className="pokemon-item">
      {!!data && (
        <img
          alt="pokemon"
          src={data.sprites.other.dream_world.front_default}></img>
      )}
    </div>
  );
};

export default PokemonItem;

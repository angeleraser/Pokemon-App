import React from "react";
import PokemonItem from "./PokemonItem";
import "./css/PCScreen.css";
import { useContext } from "react";
import { PokemonContext } from "../../PokemonContext/PokemonContext";
const PCScreen = () => {
  const {
    state: { pc },
  } = useContext(PokemonContext);
  return (
    <div className="w-full pc-screen items-center flex flex-col">
      <h2 className="w-full">Box 1</h2>
      <div className="pokemon-wrapper">
        {pc.pokemonList.map((pokemon) => (
          <PokemonItem data={pokemon} />
        ))}
      </div>
    </div>
  );
};

export default PCScreen;

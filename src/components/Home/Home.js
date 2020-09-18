import React from "react";
import "./css/Main.css";
import PokemonList from "./PokemonList/PokemonList";
import { PokemonTypes } from "./PokemonTypes/PokemonTypes";
export const Home = () => {
  return (
    <main className="w-full main flex flex-col items-center">
        <PokemonTypes />
        <PokemonList />
    </main>
  );
};

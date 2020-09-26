import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { PokemonContext } from "../../PokemonContext/PokemonContext";
import { types } from "../../types/types";
import "./css/Header.css";
import Navbar from "./NavBar/Navbar";
export const Header = () => {
  const { arenaDispatch, arena } = useContext(PokemonContext);
  return (
    <header className="header relative w-full flex items-center justify-between">
      {/* Logo  */}
      <Link
        onClick={() => {
          arena.enabled && arenaDispatch({ type: types.disableArena });
        }}
        className=""
        to="/">
        {" "}
        <img src="/images/png/pokemon-logo.png" alt="pokemon logo" />
      </Link>
      <Navbar />
    </header>
  );
};

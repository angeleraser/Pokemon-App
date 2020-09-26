import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { PokemonContext } from "../../../PokemonContext/PokemonContext";
import { pcIcon } from "../../../svg-icons";
import { types } from "../../../types/types";
import "./css/Menu.css";
import { SearchPokemon } from "./SearchPokemon";
export const Menu = ({ isHidden, hiddenMenu }) => {
  const { arena, arenaDispatch } = useContext(PokemonContext);
  return (
    <div
      className={`menu w-full flex flex-col items-end absolute ${
        !isHidden ? "active" : ""
      }`}>
      <SearchPokemon hiddenMenu={hiddenMenu} />
      <Link
        onClick={() => {
          arena.enabled && arenaDispatch({ type: types.disableArena });
          hiddenMenu(true);
        }}
        to="/pc"
        className="my-team">
        pc
        {pcIcon}
      </Link>
    </div>
  );
};

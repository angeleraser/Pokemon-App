import React from "react";
import { pcIcon } from "../../../svg-icons";
import "./css/Menu.css";
import { SearchPokemon } from "./SearchPokemon";
export const Menu = ({ isHidden, hiddenMenu }) => {
  return (
    <div
      className={`menu w-full flex flex-col items-end absolute ${
        isHidden ? "active" : ""
      }`}>
      <SearchPokemon hiddenMenu={hiddenMenu} />
      <div className="my-team">
        pc
        {pcIcon}
      </div>
    </div>
  );
};

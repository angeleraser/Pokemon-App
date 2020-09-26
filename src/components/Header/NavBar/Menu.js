import React from "react";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { PokemonContext } from "../../../PokemonContext/PokemonContext";
import { pcIcon } from "../../../svg-icons";
import { types } from "../../../types/types";
import "./css/Menu.css";
import { SearchPokemon } from "./SearchPokemon";
export const Menu = ({ isHidden, hiddenMenu }) => {
  const {
    arena,
    arenaDispatch,
    state: { homePage },
  } = useContext(PokemonContext);
  const history = useHistory();
  return (
    <div
      className={`menu w-full flex flex-col items-end absolute ${
        !isHidden ? "active" : ""
      }`}>
      <SearchPokemon hiddenMenu={hiddenMenu} />
      <button
        onClick={() => {
          arena.enabled && arenaDispatch({ type: types.disableArena });
          !homePage.status.current &&
            !homePage.status.isFetching &&
            history.replace("/pc");
          hiddenMenu(true);
        }}
        className="my-team">
        pc
        {pcIcon}
      </button>
    </div>
  );
};

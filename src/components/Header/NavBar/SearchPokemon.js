import React from "react";
import { useContext } from "react";
import { useHistory } from "react-router";
import { PokemonContext } from "../../../PokemonContext/PokemonContext";
import { searchIcon } from "../../../svg-icons";
import { types } from "../../../types/types";
import useForm from "../../hooks/useForm";

export const SearchPokemon = ({ hiddenMenu }) => {
  const [{ search }, handleInputValue, reset] = useForm({ search: "" });
  const { dispatch } = useContext(PokemonContext);
  const { push } = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim().length > 2) {
      reset();
      hiddenMenu((prev) => !prev);
      dispatch({ type: types.setPokemonDetails, payload: null }); // resets the pokemon details to show loading animation
      dispatch({ type: types.disableArena}); // resets the pokemon details to show loading animation
      push(`/pokemon/${search.toLowerCase()}`);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      autoComplete="off"
      className={`w-full search-pokemon-form flex items-strech`}>
      <input
        name="search"
        type="text"
        onChange={handleInputValue}
        value={search}
        placeholder="Search a pokemon..."
      />{" "}
      <button type="submit">{searchIcon}</button>
    </form>
  );
};

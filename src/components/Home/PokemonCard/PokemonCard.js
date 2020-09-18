/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import "./css/PokemonCard.css";
import { getStatBarColor } from "../../../selectors/getStatBarColor";
import { calcPercentage } from "../../../functions/calcPercentage";
import { getPokemonProps } from "../../../selectors/getPokemonProps";
import { useFetch } from "../../hooks/useFetch";
import { getFormatedUnity } from "../../../functions/getFormatedUnity";
export const PokemonCard = ({ data }) => {
  const pokemon = getPokemonProps(data);
  const [{ data: imageURL }, fetchPokemonImage] = useFetch();
  // Fetch pokemon image if the pokemon.image or pokemon.front_default is null
  useEffect(() => {
    if (pokemon.forms.length && !!!pokemon.front_default && !!!pokemon.image) {
      fetchPokemonImage(pokemon.forms[0].url);
    }
  }, []);
  return (
    <div className="w-full flex pokemon-card flex-col items-center">
      <div className="data w-full flex flex-col items-center justify-end">
        {/* Height  */}
        <span className="height boder-circle">
          {getFormatedUnity(pokemon.height, "height")}
        </span>
        {/* Weight  */}
        <span className="weight boder-circle">
          {getFormatedUnity(pokemon.weight, "weight")}
        </span>
        {/* ID & IMG  */}
        <div className="pokemon-img-id w-full relative">
          {/* Pokemon image  */}
          <img
            src={
              pokemon.image ||
              imageURL?.sprites.front_default ||
              pokemon.front_default ||
              pokemon.icons.front_default ||
              "./images/png/unknown.png"
            }
            alt={pokemon.name}
            className="z-50"
          />
          {/* ID  */}
          <p className="id">#{pokemon.id}</p>
        </div>
        {/* Name  */}
        <h2 className="z-40">{pokemon.name}</h2>
        {/* Types  */}
        <div className="types w-full items-center flex justify-center">
          {pokemon.types.map(({ type: { name } }) => (
            <span
              style={{
                color: `var(--${name})`,
              }}
              key={name}>
              {name}
            </span>
          ))}
        </div>
        <p className="ability">{pokemon.abilities[0]?.ability.name}</p>
      </div>
      {/* Statistics  */}
      <div className="stats grid w-full">
        {pokemon.stats.map(({ base_stat, stat: { name } }) => (
          <label key={name} htmlFor={name}>
            <h3>{name}</h3>
            <p>{base_stat}</p>
            <div className="bar-wrapper w-full">
              <div
                style={{
                  backgroundImage: `${getStatBarColor(base_stat)}`,
                  width: `${calcPercentage(base_stat, 252)}%`,
                }}
                className="bar w-full"
                id={name}></div>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

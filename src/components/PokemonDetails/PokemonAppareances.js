import React from "react";
import { getFormatedStr } from "../../functions/getFormatedStr";
export const PokemonAppareances = ({ data }) => {
  const { game_indices } = data;
  return (
    <div className="w-full game-appareances-wrapper grid">
      <h2>Game Appareances: </h2>
      {game_indices.map(({ version: { name } }) => (
        <div className='flex' key={name}>
          {" "}
          <span className="capitalize">
            {`Pokemon ${getFormatedStr(name)}`}
          </span>
          <img src={`/images/png/pokemon-generations/pokemon-${getFormatedStr(name)}-icon.png`} alt={name} />
        </div>
      ))}
    </div>
  );
};

import React from "react";

export const PokemonTypes = ({ pokemon }) => {
  return (
    <div className="types w-full items-center flex justify-center">
      {pokemon.types.map(({ type: { name } }) => (
        <span
          style={{
            backgroundColor: `var(--${name})`,
          }}
          key={name}>
          {name}
        </span>
      ))}
    </div>
  );
};

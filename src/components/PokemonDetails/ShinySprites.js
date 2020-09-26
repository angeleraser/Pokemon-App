import React from "react";

export const ShinySprites = ({ data }) => {
  return (
    <div className="shiny-version flex flex-col items-start">
      <h1>Shiny version:</h1>
      <div className="pokemon-shiny-images flex items-center">
        {data.sprites.front_shiny && (
          <img
            src={data.sprites.front_shiny}
            alt={`${data.name} front shiny`}
          />
        )}
        {!!data.sprites.back_shiny && (
          <img src={data.sprites.back_shiny} alt={`${data.name} back shiny`} />
        )}
      </div>
    </div>
  );
};

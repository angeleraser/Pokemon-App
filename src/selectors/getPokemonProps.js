export const getPokemonProps = (pokemon, con) => {
  const {
    name,
    forms,
    weight,
    height,
    stats,
    sprites: {
      other: {
        dream_world: { front_default: image },
      },
      front_default,
      versions:{
        "generation-viii":{
          icons
        }
      }
    },
    id,
    types,
    abilities,
  } = pokemon;
  if (con !== "All") {
    return {
      name,
      forms,
      height,
      weight,
      id,
      image,
      front_default,
      types,
      stats,
      abilities,
      icons,
    };
  } else {
    return {
      ...pokemon,
    };
  }
};

export const getPokemonProps = (pokemon, con) => {
  const {
    name,
    forms,
    weight,
    height,
    stats,
    sprites: {
      other: {
        "official-artwork": { front_default: officialArtwork },
        dream_world: { front_default: dreamWorld },
      },
      front_default,
      versions: {
        "generation-viii": { icons },
      },
    },
    id,
    types,
    abilities,
    captureRate,
    isCatched,
  } = pokemon;
  if (con !== "All") {
    return {
      name,
      forms,
      height,
      weight,
      id,
      officialArtwork,
      dreamWorld,
      front_default,
      types,
      stats,
      abilities,
      icons,
      captureRate,
      isCatched,
    };
  } else {
    return {
      ...pokemon,
    };
  }
};

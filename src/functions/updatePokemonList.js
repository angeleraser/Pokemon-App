export const updatePokemonListWhenThePokemonIsCatched = (list, pokemonCatched) => {
  return list.map((pokemon) => {
    if (pokemon.name === pokemonCatched) {
      return {
        ...pokemon,
        isCatched: true,
      };
    } else {
      return {
        ...pokemon,
      };
    }
  });
};

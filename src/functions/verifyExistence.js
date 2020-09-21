export const verifyExistence = (pokemonList,name) =>
  pokemonList.some((pokemon) => pokemon.name === name);

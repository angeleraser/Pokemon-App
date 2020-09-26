export const getFallbackPokemonAppareances = (generation) => {
  switch (generation) {
    case "6th":
      return {
        game_indices: [
          {
            version: {
              name: "x",
            },
          },
          {
            version: {
              name: "y",
            },
          },
          {
            version: {
              name: "ruby-omega",
            },
          },
          {
            version: {
              name: "sapphire-alpha",
            },
          },
        ],
      };
    case "7th":
      return {
        game_indices: [
          {
            version: {
              name: "sun",
            },
          },
          {
            version: {
              name: "moon",
            },
          },
          {
            version: {
              name: "ultra-sun",
            },
          },
          {
            version: {
              name: "ultra-moon",
            },
          },
        ],
      };
    case "8th":
      return {
        game_indices: [
          {
            version: {
              name: "sword",
            },
          },
          {
            version: {
              name: "shield",
            },
          },
        ],
      };
    default:
      break;
  }
};

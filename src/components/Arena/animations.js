export const pokeballAnimations = {
  throw: {
    animationName: "throwPokeball",
    animationFillMode: "forwards",
    animationDuration: "1s",
    animationTimingFunction: "ease",
  },
  shake: {
    animationName: "shake",
    animationIterationCount: "infinite",
    top: "-200px",
    width: "70px",
    height: "70px",
    animationDuration: "1.5s",
  },
  initial: {
    animation: "none",
    top: "0",
    width: "100px",
    height: "100px",
  },
  success: {
    animation: "none",
    top: "-200px",
    width: "70px",
    height: "70px",
  },
};

export const pokemonAnimations = {
  shrink: {
    width: "0px",
  },
  grow: {
    width: "86px",
  },
};

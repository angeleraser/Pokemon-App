export const getPokemonGeneration = (str) => {
  let gen = "Unknow";
  switch (str.split("-")[1]) {
    case "i":
      gen = 1;
      break;
    case "ii":
      gen = 2;
      break;
    case "iii":
      gen = 3;
      break;
    case "iv":
      gen = 4;
      break;
    case "v":
      gen = 5;
      break;
    case "vi":
      gen = 6;
      break;
    case "vii":
      gen = 7;
      break;
    case "viii":
      gen = 8;
      break;
    case "ix":
      gen = 9;
      break;
    case "x":
      gen = 10;
      break;
    default:
      break;
  }
  return gen + 'th';
};

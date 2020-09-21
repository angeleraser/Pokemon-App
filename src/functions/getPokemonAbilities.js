import { getFormatedStr } from "./getFormatedStr";

export const getPokemonAbilities = (arr) => {
  if (arr.length > 1) {
    return arr
      .map(({ ability }, i, arr) =>
        i !== arr.length - 1 ? ` ${ability.name},` : " " + ability.name
      )
      .map((str) => getFormatedStr(str));
  } else {
    return getFormatedStr(arr[0].ability.name);
  }
};

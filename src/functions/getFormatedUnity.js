export const getFormatedUnity = (number, prop) => {
  let value = number / 10;
  let unity;
  switch (prop) {
    case "height":
      unity = value < 1 ? "cm" : "m";
      break;
    case "weight":
      unity = value < 1 ? "gr" : "kg";
      break;
    default:
      break;
  }
  return value < 1 ? value * 100 + unity : value + unity;
};

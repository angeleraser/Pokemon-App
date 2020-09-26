export const pokemonIsCatched = (rate, currentHP) => {
  let multiplier;
  switch (true) {
    case currentHP > 80 && currentHP <= 100:
      multiplier = 1000;
      break;
    case currentHP > 60 && currentHP <= 80:
      multiplier = 800;
      break;
    case currentHP > 40 && currentHP <= 60:
      multiplier = 600;
      break;
    case currentHP > 20 && currentHP <= 40:
      multiplier = 400;
      break;
    case currentHP > 0 && currentHP <= 20:
      multiplier = 200;
      break;
    case currentHP > 15 && currentHP <= 10:
      multiplier = 100;
      break;
    case currentHP > 10 && currentHP <= 5:
      multiplier = 50;
      break;
    case currentHP > 5 && currentHP <= 1:
      multiplier = 25;
      break;
    default:
      break;
  }
  return !(Math.floor(Math.random() * multiplier) >= rate);
};

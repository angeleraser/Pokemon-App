export const getSuccesRate = (chances) => {
  let multiplier = 10;
  switch (true) {
    case chances < 10:
      multiplier = 1000;
      break;
    case chances >= 10 && chances <= 50:
      multiplier = 500;
      break;
    case chances > 50 && chances <= 100:
      multiplier = 200;
      break;
    case chances > 100 && chances < 500:
      multiplier = 50;
      break;
    default:
      break;
  }

  return Math.round(Math.random() * multiplier) % 2 === 0;
};

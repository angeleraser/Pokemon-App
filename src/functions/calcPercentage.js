export const calcPercentage = (value, max = 1) => {
  return Math.round((value * 100) / max);
};

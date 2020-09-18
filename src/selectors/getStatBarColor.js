export const getStatBarColor = (value) => {
  let result;
  switch (true) {
    case value <= 50:
      result = "var(--low)";
      break;
    case value > 50 && value < 100:
      result = "var(--low-medium)";
      break;
    case value >= 100 && value < 150:
      result = "var(--medium)";
      break;
    case value >= 150:
      result = "var(--high)";
      break;
    default:
      break;
  }
  return result;
};

export const getPokemonHPBarColor = (currentHP) => {
  let result;
    switch (true) {
      case currentHP <= 20:
        result = "var(--low)";
        break;
      case currentHP > 20 && currentHP < 40:
        result = "var(--low-medium)";
        break;
      case currentHP >= 40 && currentHP < 50:
        result = "var(--medium)";
        break;
      case currentHP >= 50:
        result = "var(--high)";
        break;
      default:
        break;
    }
    return result;
}
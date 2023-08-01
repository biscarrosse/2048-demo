export const isDivisibleByFour = (num) => {
  const input = typeof num === "number" ? num.toString() : num;

  if (input === "0") return false;
  if (input.length <= 2) return !Boolean(input % 4);

  const lastTwoCharacters = input.slice(input.length - 2, input.length);
  // +lastTwoCharacters would also produce a number
  // yet using Number constructor I make myself clear about my intention
  return !Boolean(Number(lastTwoCharacters) % 4);
};

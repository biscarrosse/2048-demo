import { isDivisibleByFour } from "../index";

describe("isDivisibleByFour", () => {
  test("4 / 4 is divisible by 4", () => {
    expect(isDivisibleByFour(4)).toBe(true);
  });
  test("-4 / 4 is divisible by 4", () => {
    expect(isDivisibleByFour(-4)).toBe(true);
  });
  test("164 / 4 is divisible by 4", () => {
    expect(isDivisibleByFour(164)).toBe(true);
  });
  test("0 / 4 is NOT divisible by 4", () => {
    expect(isDivisibleByFour(0)).toBe(false);
  });
  test("5 / 4 is NOT divisible by 4", () => {
    expect(isDivisibleByFour(5)).toBe(false);
  });
});

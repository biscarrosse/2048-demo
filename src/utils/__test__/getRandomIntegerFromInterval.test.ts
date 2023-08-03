import { getRandomIntegerFromInterval } from "../index";

describe("getRandomIntegerFromInterval", () => {
  test("get 0 to 5", () => {
    expect(getRandomIntegerFromInterval(0, 5)).toBeLessThanOrEqual(5);
    expect(getRandomIntegerFromInterval(0, 5)).toBeGreaterThanOrEqual(0);
  });
});

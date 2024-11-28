const { concat, concatify } = require("../src/concat");

test("concat of [1, 2] and [3, 4] is [1, 2, 3, 4]", () => {
  expect(concat([1, 2], [3, 4])).toEqual([1, 2, 3, 4]);
});

test("concatify of [1, 2], [3, 4] and [5, 6] is [1, 2, 3, 4, 5, 6]", () => {
  expect(concatify([1, 2], [3, 4], [5, 6])).toEqual([1, 2, 3, 4, 5, 6]);
});

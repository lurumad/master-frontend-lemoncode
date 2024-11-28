const { head, tail, init, last } = require("../src/array-operations");

test("head of [1, 2, 3] is 1", () => {
  expect(head([1, 2, 3])).toBe(1);
});

test("tail of [1, 2, 3] is [2, 3]", () => {
  expect(tail([1, 2, 3])).toEqual([2, 3]);
});

test("init of [1, 2, 3] is [1, 2]", () => {
  expect(init([1, 2, 3])).toEqual([1, 2]);
});

test("last of [1, 2, 3] is [3]", () => {
  expect(last([1, 2, 3])).toEqual([3]);
});

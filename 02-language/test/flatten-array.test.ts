import { flatten } from "../src/flatten-array"
import { expect, test } from "@jest/globals"

test("flatten array of [1, [2, 3], [[4], [5, 6, [7, 8, [9]]]]] is [1, 2, 3, 4, 5, 6, 7, 8, 9]", () => {
  expect(flatten([1, [2, 3], [[4], [5, 6, [7, 8, [9]]]]])).toEqual([
    1, 2, 3, 4, 5, 6, 7, 8, 9,
  ]);
});

test('flatten array of ["a", ["b", "c"], [["d"], ["e", "f", ["g", "h", ["i"]]]]] is ["a","b","c","d","e","f","g","h","i"]', () => {
  expect(flatten(["a", ["b", "c"], [["d"], ["e", "f", ["g", "h", ["i"]]]]])).toEqual(["a", "b", "c", "d", "e", "f", "g", "h", "i"]);
});

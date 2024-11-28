const { clone, merge } = require("../src/clone-merge");

test("clone creates a new object with the same properties as the source object", () => {
  const source = {
    name: "Luis",
    surname: "Ruiz",
    age: 44,
    address: { city: "Madrid", postalCode: 28028 },
    hobbies: ["ufc", "cooking", "football"],
  };

  const cloned = clone(source);

  expect(cloned).toEqual(source);
});

test("merge source object properties with target object properties into a new object", () => {
  const source = { name: "Paula", surname: "Ruiz", country: "SPA" };
  const target = { name: "Martina", age: 9, married: false };
  const expected = {
    name: "Paula",
    surname: "Ruiz",
    country: "SPA",
    age: 9,
    married: false,
  };
  const merged = merge(source, target);

  expect(merged).toEqual(expected);
});

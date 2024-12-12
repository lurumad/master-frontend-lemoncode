let x = NaN;

console.log(x === x); // false https://es5.github.io/#x11.9.6

const isNaNValue = (v) => Number.isNaN(v);

console.log(isNaNValue(NaN)); // true

x =
  "No hay ningún valor de x para el cual la expresión !isNaNValue(x) && x !== x pueda evaluarse como true.";
console.log(!isNaNValue(x) && x !== x); // false

x = Infinity;

console.log(x + 1 === x - 1); // true

counter = 2;
x = {
  valueOf: () => --counter,
};

console.log(x > x); // true

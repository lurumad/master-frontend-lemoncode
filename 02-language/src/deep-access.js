const myObject = {
  a: 1,
  b: {
    c: null,
    d: {
      e: 3,
      f: {
        g: "bingo",
      },
    },
  },
};

const deepGet = (obj, ...props) => {
  if (!obj || props.length === 0) {
    return obj;
  }
  const [prop, ...rest] = [...props];
  if (props.length == 1) {
    return obj[prop];
  }
  return deepGet(obj[prop], ...rest);
};

console.log("============= Deep Get =============");
console.log(deepGet(myObject, "x")); // undefined
console.log(deepGet(myObject, "a")); // 1
console.log(deepGet(myObject, "b")); // { c: null, d: {....}}
console.log(deepGet(myObject, "b", "c")); // null
console.log(deepGet(myObject, "b", "d", "f", "g")); // bingo
console.log(deepGet(myObject)); // {a: 1, b: {...}}

const mySetObject = {};

const deepSet = (value, obj, ...props) => {
  if (!obj || props.length === 0) {
    return obj;
  }
  const [prop, ...rest] = [...props];
  if (props.length == 1) {
    obj[prop] = value;
    return obj;
  }
  obj[prop] = deepSet(value, obj[prop] || {}, ...rest);
  return obj;
};

console.log("============= Deep Set =============");
deepSet(1, mySetObject, "a", "b");
console.log(JSON.stringify(mySetObject)); // {a: { b: 1}}
deepSet(2, mySetObject, "a", "c");
console.log(JSON.stringify(mySetObject)); // {a: { b: 1, c: 2}}
deepSet(3, mySetObject, "a");
console.log(JSON.stringify(mySetObject)); // {a: 3}
deepSet(4, mySetObject);
console.log(JSON.stringify(mySetObject)); // Do nothing // {a: 3}

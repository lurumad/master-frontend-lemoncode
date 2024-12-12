const head = (array) => {
  const [first] = array;
  return first;
};

const tail = (array) => {
  const [, ...rest] = array;
  return rest;
};

const init = (array) => {
  return array.slice(0, -1);
};

const last = (array) => {
  return array.slice(-1);
};

module.exports = {
  head,
  tail,
  init,
  last,
};

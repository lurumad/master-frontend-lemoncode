const concat = (a, b) => {
  return [...a, ...b];
};

const concatify = (...arrays) => {
  let result = [];
  arrays.forEach((array) => result.push(...array));
  return result;
};

module.exports = {
  concat,
  concatify,
};

const clone = (source) => {
  return JSON.parse(JSON.stringify(source));
};

const merge = (source, target) => {
  return { ...target, ...source };
};

module.exports = {
  clone,
  merge,
};

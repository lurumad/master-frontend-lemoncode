export const flatten = <T>(array: Array<T>): Array<T> => {
  return array.reduce<Array<T>>(
    (accumulator, currentValue) =>
      accumulator.concat(
        Array.isArray(currentValue) ? flatten(currentValue) : currentValue
      ),
    []
  );
};

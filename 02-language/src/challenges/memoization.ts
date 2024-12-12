let count = 0; // Comprobacion de nº de ejecuciones
const repeatText = (repetitions: number, text: string): string =>
    (count++, `${text} `.repeat(repetitions).trim())

type Args = Parameters<typeof repeatText>;

const memoize = (func: Function): Function => {
    const cache = {}
    return (...args: Args) => {
        return cache[args.join("-")] ??= func(...args)
    }
};

const memoizedGreet = memoize(repeatText);

console.log(memoizedGreet(1, "pam"));   // pam
console.log(memoizedGreet(3, "chun"));  // chun chun chun
console.log(memoizedGreet(1, "pam"));   // pam
console.log(memoizedGreet(3, "chun"));  // chun chun chun
console.log(count);
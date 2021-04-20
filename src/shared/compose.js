const compose = (...fn) => (initialValue) =>
  [...fn].reduce((value, fn) => fn(value), initialValue);

const composeAsync = (...fns) => (initialValue) =>
  [...fns].reduce(
    (chain, func) => chain.then(func),
    Promise.resolve(initialValue)
  );

module.exports = { compose, composeAsync };

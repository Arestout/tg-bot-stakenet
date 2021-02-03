const cache = {};

const remove = (id) => {
  delete cache[id];
};

const set = (id) => {
  cache[id] = true;

  setTimeout(() => remove(id), 1000);
};

const get = (id) => {
  return cache[id] ? true : false;
};

module.exports = { set, get, remove };

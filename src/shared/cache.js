const cache = {};

const deleteFromCache = (id) => {
  delete cache[id];
};

const addToCache = (id) => {
  cache[id] = true;

  setTimeout(() => {
    deleteFromCache.bind(this, id);
  }, 1000);
};

const checkCache = (id) => (cache[id] ? true : false);

module.exports = { addToCache, checkCache };

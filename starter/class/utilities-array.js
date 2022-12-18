// Return an array with the item removed

const newArrayWithoutItem = (array, item) => {
  return array
    .slice(0, array.indexOf(item))
    .concat(array.slice(array.indexOf(item) + 1));
};

module.exports = { newArrayWithoutItem };

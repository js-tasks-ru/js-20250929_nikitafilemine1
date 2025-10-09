/**
 * invertObj - should swap object keys and values
 * @param {object} obj - the initial object
 * @returns {object | undefined} - returns new object or undefined if nothing did't pass
 */

export function invertObj(obj) {
  const res = obj;

  if (obj) {
    return Object.entries(obj).reduce((obj, [key, val]) => {
      obj[`${val}`] = key;
      return obj;
    }, {});
  }

  return res;
}

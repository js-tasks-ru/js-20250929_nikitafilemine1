/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */

export function createGetter(path) {
  const pathSplitted = path.split(".");

  return function (obj) {
    for (const path of pathSplitted) {
      if (obj.hasOwnProperty(path)) {
        const value = obj[path];
        if (typeof value === "object" && value !== null) {
          obj = value;
        } else {
          return value;
        }
      }
    }
  };
}

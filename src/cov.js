import { mean } from "./mean.js";
import { sum } from "./sum.js";
import { isNumber } from "./is-number.js";

/**
 * Covariance of two variables x and y in a data set
 * @param {Array} data - An array of objects.
 * @param {String} options.x - x variable
 * @param {String} options.y - y variable
 * @returns {Number} - Covariance
 */

export function cov(data, options = {}) {
  let dd = data
    .filter((d) => isNumber(d[options.x]))
    .filter((d) => isNumber(d[options.y]));

  let meanx = mean(dd.map((d) => d[options.x]));
  let meany = mean(dd.map((d) => d[options.y]));

  return (
    (sum(dd.map((d) => (d[options.x] - meanx) * (d[options.y] - meany))) * 1) /
    (dd.length - 1)
  );
}

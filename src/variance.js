import { mean } from "./mean.js";
import { sum } from "./sum.js";
import { isNumber } from "./is-number.js";

/**
 * Variance of the values of an array.
 * @param {Number[]} x - An array of values.
 * @returns {Number} - Variance
 */
export function variance(x) {
  let v = x.filter((d) => isNumber(d)).map((a) => +a);
  let m = mean(v);
  return (sum(v.map((d) => (d - m) ** 2)) * 1) / (v.length - 1);
}

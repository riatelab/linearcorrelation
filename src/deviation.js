import { variance } from "./variance.js";
/**
 * Standard devisation of the values of an array.
 * @param {Number[]} x - An array of values.
 * @returns {Number} - Standard devisation
 */
export function deviation(x) {
  return Math.sqrt(variance(x));
}

import { cov } from "./cov.js";
import { deviation } from "./deviation.js";
import { rank } from "./rank.js";
import { sum } from "./sum.js";
import { isNumber } from "./is-number.js";

export function test(data, options = {}) {
  data = data
    .filter((d) => isNumber(d[options.x]))
    .filter((d) => isNumber(d[options.y]));

  const precision = 6;

  // pearson
  let pearson =
    cov(data, options) /
    (deviation(data.map((d) => d[options.x])) *
      deviation(data.map((d) => d[options.y])));

  // spearman
  let dd = data
    .filter((d) => isNumber(d[options.x]))
    .filter((d) => isNumber(d[options.y]));

  let rank_x = rank(dd.map((d) => d[options.x]));
  let rank_y = rank(dd.map((d) => d[options.y]));

  let spearman =
    1 -
    (sum(rank_x.map((d, i) => (d - rank_y[i]) ** 2)) * 6) /
      (dd.length * (dd.length ** 2 - 1));

  return {
    pearson: +pearson.toFixed(precision),
    spearman: +spearman.toFixed(precision),
  };
}

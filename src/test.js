import { cov } from "./cov.js";
import { deviation } from "./deviation.js";
import { rank } from "./rank.js";
import { sum } from "./sum.js";
import { isNumber } from "./is-number.js";

export function test(x, options = {}) {
  // precison
  const precision = 4;

  // rempve missing values
  let data = x
    .filter((d) => isNumber(d[options.x]))
    .filter((d) => isNumber(d[options.y]));

  // missing TDOD
  let missing = x.length - data.length;

  // Log transformation

  data = x.map((d) => ({
    x: options.logx ? Math.log(d[options.x]) : d[options.x],
    y: options.logy ? Math.log(d[options.y]) : d[options.y],
  }));

  // pearson
  let pearson =
    cov(data, { x: "x", y: "y" }) /
    (deviation(data.map((d) => d.x)) * deviation(data.map((d) => d.y)));

  // spearman
  let dd = data.filter((d) => isNumber(d.x)).filter((d) => isNumber(d.y));

  let rank_x = rank(dd.map((d) => d.x));
  let rank_y = rank(dd.map((d) => d.y));

  let spearman =
    1 -
    (sum(rank_x.map((d, i) => (d - rank_y[i]) ** 2)) * 6) /
      (dd.length * (dd.length ** 2 - 1));

  return {
    pearson: +pearson.toFixed(precision),
    spearman: +spearman.toFixed(precision),
    missing,
  };
}

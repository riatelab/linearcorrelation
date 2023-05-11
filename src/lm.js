import { variance } from "./variance.js";
import { cov } from "./cov.js";
import { mean } from "./mean.js";
import { sum } from "./sum.js";
import { deviation } from "./deviation.js";
import { rank } from "./rank.js";
import { isNumber } from "./is-number.js";

export function lm(data, options = {}) {
  let covavriance = cov(data, { x: options.x, y: options.y });

  let a = covavriance / variance(data.map((d) => d[options.x]));

  let b =
    mean(data.map((d) => d[options.y])) -
    a * mean(data.map((d) => d[options.x]));

  let predict = function (x) {
    return a * x + b;
  };

  let y_mean = mean(data.map((d) => d[options.y]));
  //   let sst = sum(data.map((d) => (d[options.y] - y_mean) ** 2));
  //   let ssr = sum(data.map((d) => (predict(d[options.x]) - y_mean) ** 2));
  //   let sse = sum(data.map((d) => (d[options.y] - predict(d[options.x])) ** 2));
  //   let r2 = ssr / sst;
  let rsquared =
    sum(data.map((d) => (predict(d[options.x]) - y_mean) ** 2)) /
    sum(data.map((d) => (d[options.y] - y_mean) ** 2));

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
    equation: `y=${a.toFixed(2)}x+${b.toFixed(2)}`,
    a,
    b,
    predict,
    covavriance,
    rsquared,
    pvalue: "",
    pearson,
    spearman,
  };
}

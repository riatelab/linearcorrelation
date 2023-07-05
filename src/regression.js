import { variance } from "./variance.js";
import { cov } from "./cov.js";
import { mean } from "./mean.js";
import { sum } from "./sum.js";
import { deviation } from "./deviation.js";
import { prefix } from "./prefix.js";
import { column } from "./column.js";
import { isNumber } from "./is-number.js";

export function regression(data, options = {}) {
  data = data
    .filter((d) => isNumber(d[options.x]))
    .filter((d) => isNumber(d[options.y]));

  const precision = 6;
  let covavriance = cov(data, { x: options.x, y: options.y });

  // equation
  let a = covavriance / variance(data.map((d) => d[options.x]));
  let b =
    mean(data.map((d) => d[options.y])) -
    a * mean(data.map((d) => d[options.x]));

  let predict = function (x) {
    return a * x + b;
  };

  // rsquared
  let y_mean = mean(data.map((d) => d[options.y]));
  let rsquared =
    sum(data.map((d) => (predict(d[options.x]) - y_mean) ** 2)) /
    sum(data.map((d) => (d[options.y] - y_mean) ** 2));

  // residuals
  const keys = column(data);
  let data2 = [...data];
  let res = data.map((d) => d[options.y] - predict(d[options.x]));
  let sd = deviation(res);
  let resnorm = res.map((d) => d / sd);

  data2 = data.map((d, i) => ({
    ...d,
    [prefix("index", keys)]: i,
    [prefix("residuals", keys)]: res[i],
    [prefix("residuals_norm", keys)]: resnorm[i],
  }));

  return {
    equation: `y=${a.toFixed(2)}x+${b.toFixed(2)}`,
    a: +a.toFixed(precision),
    b: +b.toFixed(precision),
    predict,
    rsquared: +rsquared.toFixed(precision),
    data: data2,
  };
}

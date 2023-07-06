import { variance } from "./variance.js";
import { cov } from "./cov.js";
import { mean } from "./mean.js";
import { sum } from "./sum.js";
import { deviation } from "./deviation.js";
import { prefix } from "./prefix.js";
import { column } from "./column.js";
import { isNumber } from "./is-number.js";

export function lm(x, options = {}) {
  x = x
    .filter((d) => isNumber(d[options.x]))
    .filter((d) => isNumber(d[options.y]));

  let data = x.map((d) => ({
    x: options.logx ? Math.log(d[options.x]) : d[options.x],
    y: options.logy ? Math.log(d[options.y]) : d[options.y],
  }));

  const precision = 4;
  let covavriance = cov(data, { x: "x", y: "y" });

  // equation
  let a = covavriance / variance(data.map((d) => d.x));
  let b = mean(data.map((d) => d.y)) - a * mean(data.map((d) => d.x));

  let predict = function (x) {
    return a * x + b;
  };

  // rsquared
  let y_mean = mean(data.map((d) => d.y));
  let rsquared =
    sum(data.map((d) => (predict(d.x) - y_mean) ** 2)) /
    sum(data.map((d) => (d.y - y_mean) ** 2));

  // residuals
  const keys = column(x);
  let res = data.map((d) => d.y - predict(d.x));
  let sd = deviation(res);
  let resnorm = res.map((d) => d / sd);

  let data2 = x.map((d, i) => ({
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

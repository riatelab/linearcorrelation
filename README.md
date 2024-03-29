# linearcorrelation

![npm](https://img.shields.io/npm/v/linearcorrelation)
![jsdeliver](https://img.shields.io/jsdelivr/npm/hw/linearcorrelation)
![license](https://img.shields.io/badge/license-MIT-success)
![code size](https://img.shields.io/github/languages/code-size/riatelab/linearcorrelation)

**linearcorrelation** is a tiny JavaScript library that performs linear regression and recovers residuals and normalized residuals.

## 1. Installation

#### <ins>In browser</ins>

```html
<script src="https://cdn.jsdelivr.net/npm/linearcorrelation" charset="utf-8"></script>
```

#### <ins>In Observable</ins>

Last version

~~~js
corr = require("linearcorrelation")
~~~

## 2. Functions

### `test()`

the `test` function calculates indicators to measure the degree of association between two quantitative variables. The test returns the linear correlation (**Pearson**), the rank correlation (**Spearman**) and the number of missing data not taken into account in the calculations. 

~~~js
test(data, {x: "gdp", y:"co2" })
~~~

It is also possible to calculate the relation with the log of the variables

~~~js
test(data, {x: "gdp", y:"co2", logx: true, logy: false })
~~~

### `lm()`

The `lm` function calculates linear regression. It returns the regression line function and the coefficient of determination (rsquared). It also returns data with residuals and normalized residuals. As before, the parameters logx and logy can be used to transform variables into log.


~~~js
lm(data, {x: "gdp", y:"co2", logx: true, logy: false })
~~~

## 3. Demo

A live demo is available on this Observable notebook: https://observablehq.com/@neocartocnrs/linearcorrelation

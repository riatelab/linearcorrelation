export function rank(x) {
  var sorted = x.slice().sort(function (a, b) {
    return b - a;
  });
  var ranks = x.slice().map(function (v) {
    return sorted.indexOf(v) + 1;
  });
  return ranks;
}

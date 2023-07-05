export function column(arr) {
  let keys = [];

  keys.push(arr.map((d) => Object.keys(d)));
  return Array.from(new Set(keys.flat(2))).filter((n) => n);
}

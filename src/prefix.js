export function prefix(str, arr, sep = "_") {
  let output = str;
  while (arr.indexOf(output) !== -1) {
    output = sep + output;
  }
  return output;
}

const { parseInt10 } = require("../utils");

function setup(input) {
  return input.trim().split("\n").map(line => line.split(" ").map(parseInt10));
}

function nextValue(array) {
  let diffs = array.map((n, i) => n - array[i + 1]);
  if (diffs.every(n => !n)) return array[0];
  else return array[0] + nextValue(diffs);
}

function part1(input) {
  let predicts = 0;
  for (let values of input) {
    predicts += nextValue(Array.from(values).reverse());
  }
  return predicts;
}

function part2(input, result) {
  let predicts = 0;
  for (let values of input) {
    predicts += nextValue(values);
  }
  return predicts;
}

module.exports = {
  setup,
  part1,
  part2,
};

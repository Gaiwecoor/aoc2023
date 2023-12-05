const { parseInt10 } = require("../utils");

// I have to admit this replacement is based on someone else's idea.
const digits = {
  //zero: 0,
  one: "o1e",
  two: "t2o",
  three: "t3e",
  four: "f4r",
  five: "f5e",
  six: "s6x",
  seven: "s7n",
  eight: "e8t",
  nine: "n9e",
};

function setup(input) {
  return input.trim().split("\n");
}

function part1(input) {
  let sum = 0;
  for (let line of input) {
    let numbers = line.split("").map(parseInt10).filter(n => !isNaN(n));
    sum += 10 * numbers[0] + numbers[numbers.length - 1];
  }
  return sum;
}

function part2(input, result) {
  const regex = new Map();
  for (let [key, value] of Object.entries(digits)) {
    regex.set(new RegExp(key, "g"), value);
  }
  let sum = 0;
  for (let line of input) {
    for (const [rx, value] of regex) {
      line = line.replace(rx, value);
    }
    let numbers = line.split("").map(parseInt10).filter(n => !isNaN(n));
    sum += 10 * numbers[0] + numbers[numbers.length - 1];
  }
  return sum;
}

module.exports = {
  setup,
  part1,
  part2,
};
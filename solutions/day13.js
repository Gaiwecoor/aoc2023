const { TextMap } = require("../utils");

function setup(input) {
  return input.trim().split("\n\n").map(chunk => new TextMap(chunk));
}

function reflect(type = "column", map, index) {
  if (type !== "row" && type !== "column") throw new Error("Type must be `row` or `column`");
  let xy = (type == "row" ? "y" : "x");
  if (index == 0 || index == map[xy]) return false;
  let step = 0;
  
  while ((index - step - 1 >= 0) && (index + step < map[xy])) {
    if (map[type](index - step - 1) != map[type](index + step)) return false;
    step++
  }
  
  return true;
}

function part1(maps) {
  let count = 0;
  for (const map of maps) {
    horizontal:
    for (let x = 0; x <= map.x; x++) {
      if (reflect("column", map, x)) count += x;
      
      let xy = (type == "row" ? "y" : "x");
      if (index == 0 || index == map.x) return false;
      let step = 0;
      
      while ((x - step - 1 >= 0) && (x + step < map.x)) {
        if (map.column(index - step - 1) != map.column(index + step)) return false;
        step++
      }
      
      return true;
    }
    for (let y = 0; y <= map.y; y++) {
      if (reflect("row", map, y)) count += 100 * y;
    }
  }
  return count;
}

function part2(input, result) {
  return undefined;
}

module.exports = {
  setup,
  part1,
  part2,
};
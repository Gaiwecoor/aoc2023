const { Point, TextMap, USet } = require("../utils");

function setup(input) {
  const map = new TextMap(input);
  const stars = [];
  const occupied = {
    x: new USet(),
    y: new USet(),
  };
  for (let y = 0; y < map.y; y++) {
    let x = -1;
    while (true) {
      x = map[y].indexOf("#", x + 1);
      if (x < 0) break;
      stars.push(new Point(x, y));
      occupied.x.add(x);
      occupied.y.add(y);
    }
  }
  return { map, occupied, stars };
}

function expand({ map, occupied, stars }, spread = 1) {
  const space = {
    x: Array(map.x),
    y: Array(map.y),
  };
  for (let d in space) {
    let count = 0;
    for (let i = 0; i < map[d]; i++) {
      if (!occupied[d].has(i)) count += spread;
      space[d][i] = count;
    }
  }
  const expanded = Array(stars.length);
  for (let i = 0; i < stars.length; i++) {
    expanded[i] = stars[i].offset({ x: space.x[stars[i].x], y: space.y[stars[i].y]});
  }
  let sum = 0;
  for (let i = 0; i < expanded.length - 1; i++) {
    for (let j = i + 1; j < expanded.length; j++) {
      sum += expanded[i].distanceTo(expanded[j]);
    }
  }
  return sum;
}

function part1(input) {
  return expand(input, 1);
}

function part2(input, result) {
  return expand(input, 1000000 - 1);
}

module.exports = {
  setup,
  part1,
  part2,
};
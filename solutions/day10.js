const { Point, TextMap } = require("../utils");

const neighbors = [
  { x: 1, y: 0 },
  { x: 0, y: 1 },
  { x: -1, y: 0 },
  { x: 0, y: -1 },
];

const offsets = {
  "7": [{ x: 0, y: 1 }, { x: -1, y: 0 }],
  "F": [{ x: 1, y: 0 }, { x: 0, y: 1 }],
  "J": [{ x: 0, y: -1 }, { x: -1, y: 0 }],
  "L": [{ x: 1, y: 0 }, { x: 0, y: -1 }],
  "|": [{ x: 0, y: 1 }, { x: 0, y: -1 }],
  "-": [{ x: 1, y: 0 }, { x: -1, y: 0 }],
};

function setup(input) {
  const map = new TextMap(input);
  const start = new Point(map.find("S"), { steps: 0 });
  let [R, D, L, U] = neighbors.map(n => map.get(start.offset(n)));
  let area = 0;
  if (R == "7" || R == "J" || R == "-") {
    start.value.next = start.offset(neighbors[0], { before: start, steps: 1 });
    area = start.y;
  } else if (D == "J" || D == "L" || D == "|") {
    start.value.next = start.offset(neighbors[1], { before: start, steps: 1 });
  } else if (L == "F" || L == "L" || L == "-") {
    start.value.next = start.offset(neighbors[2], { before: start, steps: 1 });
    area = -start.y;
  } else if (U == "7" || U == "F" || U == "|") {
    start.value.next = start.offset(neighbors[3], { before: start, steps: 1 });
  }
  return { map, start, area };
}

function part1(input) {
  let { map, start, area } = input;
  let current = start;
  while (!current.value.next.locEq(start)) {
    current = current.value.next;
    let connections = offsets[map.get(current)];
    for (let offset of connections) {
      let next = new Point(current.offset(offset), { before: current, steps: current.value.steps + 1 });
      if (!next.locEq(current.value.before)) {
        current.value.next = next;
        area += offset.x * next.y;
        break;
      }
    }
  }
  let distance = current.value.next.value.steps / 2;
  input.area = Math.abs(area) + 1 - distance;
  return distance;
}

function part2({ area }) {
  return area;
}

module.exports = {
  setup,
  part1,
  part2,
};
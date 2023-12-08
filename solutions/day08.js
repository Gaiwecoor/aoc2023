const { UMap } = require("../utils");

function setup(input) {
  let [instructions, nodes] = input.trim().split("\n\n");
  const r = /(\w+) = \((\w+), (\w+)\)/;
  map = new UMap();
  for (const line of nodes.split("\n")) {
    const [ , node, L, R ] = r.exec(line);
    map.set(node, { L, R });
  }
  return { instructions, map };
}

function part1(input) {
  const { instructions, map } = input;
  let node = "AAA";
  let step = 0;
  do {
    node = map.get(node)[instructions[step++ % instructions.length]];
  } while (node != "ZZZ");
  return step;
}

function part2(input, result) {
  const { instructions, map } = input;
  const nodes = Array.from(map.filter((_, node) => node.endsWith("A")).keys());
  let step = 0, Zs = 0, complete = 2 ** nodes.length - 1;
  let cycles = Array(nodes.length);
  do {
    for (let i = 0; i < nodes.length; i++) {
      if (Zs & (1 << i)) continue;
      nodes[i] = map.get(nodes[i])[instructions[step % instructions.length]];
      if (nodes[i].endsWith("Z")) {
        cycles[i] = (step + 1) / instructions.length;
        Zs = Zs | (1 << i);
      }
    }
    step++;
  } while (Zs != complete);
  return cycles.reduce((a, c) => a * c, instructions.length);
}

module.exports = {
  setup,
  part1,
  part2,
};
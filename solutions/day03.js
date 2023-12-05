const { Grid, USet, parseInt10 } = require("../utils");

class Schematic extends Grid {
  constructor(data) {
    super(data);
  }
  
  isPartNumber(x, y) {
    if (typeof x == "string") {
      [ x, y ] = x.split(",").map(parseInt10);
    }
    for (let i = x - 1; i <= x + 1; i++) {
      for (let j = y - 1; j <= y + 1; j++) {
        if (i == x && j == y) continue;
        if (this.get(i, j)?.isSymbol) return true;
      }
    }
    if (this.has(x + 1, y) && this.isPartNumber(x + 1, y)) return true;
    return false;
  }
  
  partNumber(x, y) {
    if (typeof x == "string") {
      [ x, y ] = x.split(",").map(parseInt10);
    }
    let num = "";
    let next = this.get(x, y);
    while (!next.numStart) next = this.get(--x, y);
    while (next && !next.isSymbol) {
      num += next.value;
      next = this.get(++x, y);
    }
    return parseInt10(num);
  }
  
  gearValue(label) {
    let [ x, y ] = label.split(",").map(parseInt10);
    let neighbors = new USet();
    for (let i = x - 1; i <= x + 1; i++) {
      for (let j = y - 1; j <= y + 1; j++) {
        if (i == x && j == y) continue;
        if (this.has(i, j) && !this.get(i, j).isSymbol) neighbors.add(this.partNumber(i, j)); 
      }
    }
    if (neighbors.size < 2) return 0;
    return neighbors.reduce((a, c) => a * c, 1);
  }
}

const schematic = new Schematic();

function setup(input) {
  let y = 0;
  for (let line of input.trim().split("\n")) {
    for (let x = 0; x < line.length; x++) {
      if (line[x] == ".") continue;
      let num = parseInt10(line[x]);
      
      let left = schematic.get(x - 1, y);
      
      schematic.set(x, y, {
        isSymbol: isNaN(num),
        value: num || line[x],
        numStart: !isNaN(num) && (left == undefined || left.isSymbol)
      });
    }
    y++;
  }
  return schematic;
}

function part1(schematic) {
  return schematic.filter((node, label) => node.numStart && schematic.isPartNumber(label))
    .reduce((a, c, label) => a + schematic.partNumber(label), 0);
}

function part2(schematic, result) {
  return schematic.filter(node => node.value == "*")
    .reduce((a, c, label) => a + schematic.gearValue(label), 0);
}

module.exports = {
  setup,
  part1,
  part2,
};
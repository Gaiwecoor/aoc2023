const fs = require("fs");

const day = process.argv[2].padStart(2, "0");
const input = fs.readFileSync(`./input/input${day}.txt`, "utf8");

const { setup, part1, part2 } = require(`./solutions/day${day.padStart(2, "0")}`);

const parsed = setup(input);

console.log("DAY", day);
const result1 = part1(parsed);
console.log("Part 1:", result1);

const result2 = part2(parsed, result1);
console.log("Part 2:", result2);

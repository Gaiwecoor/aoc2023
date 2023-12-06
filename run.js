const fs = require("fs");

const day = process.argv[2].padStart(2, "0");
const input = fs.readFileSync(`./input/input${day}.txt`, "utf8");

const { setup, part1, part2 } = require(`./solutions/day${day.padStart(2, "0")}`);

console.log("DAY", day);

console.time("Setup");
const parsed = setup(input);
console.timeEnd("Setup");

console.time("Part 1");
const result1 = part1(parsed);
console.timeEnd("Part 1");
console.log("Part 1 Result:", result1);

console.time("Part 2");
const result2 = part2(parsed, result1);
console.timeEnd("Part 2");
console.log("Part 2 Result:", result2);

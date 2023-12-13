const { parseInt10 } = require("../utils");

function setup(input) {
  const lines = input.trim().split("\n");
  const records = Array(lines.length);
  const patterns = Array(lines.length);
  for (let i = 0; i < lines.length; i++) {
    let [ record, pattern ] = lines[i].split(" ");
    records[i] = record;
    patterns[i] = pattern;
  }
  return { records, patterns };
}

function match(record, rexp) {
  const bits = { "0": ".", "1": "#" };
  
  const parts = record.split("?");
  const count = parts.length - 1;

  let matches = 0;
  
  for (let i = 0; i < 2 ** count; i++) {
    let bitstring = i.toString(2).padStart(count, "0").split("");
    let str = bitstring.map((b, j) => parts[j] + bits[b]).join("") + parts[parts.length - 1];
    if (rexp.test(str)) matches++;
  }
  return matches;
}

function part1({ records, patterns }) {
  let count = 0;
  for (let i = 0; i < records.length; i++) {
    const record = records[i];
    const pattern = patterns[i];
    const rexp = new RegExp(`^\\.*${pattern.split(",").map(n => `#{${n}}`).join("\\.+")}\\.*$`);
    count += match(record, rexp);
  }
  return count;
}

function part2({ records, patterns }, result) {
  return "Sad Trombone";
  let count = 0;
  for (let i = 0; i < records.length; i++) {
    const record = Array(5).fill(records[i]).join("?");
    const pattern = Array(5).fill(patterns[i]).join(",");
    const rexp = new RegExp(`^\\.*${pattern.split(",").map(n => `#{${n}}`).join("\\.+")}\\.*$`);
    count += match(record, rexp);
  }
  return count;
}

module.exports = {
  setup,
  part1,
  part2,
};
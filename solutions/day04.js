const { USet, parseIntArray } = require("../utils");

function setup(input) {
  input = input.trim().split("\n");
  const r = /Card +(\d+):((?: +\d+)+) \|((?: +\d+)+)/;
  const cards = Array(input.length);
  input.forEach((line, i) => {
    let [ , card, win, mine ] = r.exec(line);
    let data = {
      card: parseInt(card, 10),
      count: 1,
      win: new USet(win.trim().split(" ").map(parseIntArray)),
      mine: new USet(mine.trim().split(" ").map(parseIntArray)),
      matches: undefined,
    };
    data.win.delete(NaN);
    data.mine.delete(NaN);
    cards[i] = data;
  });
  return cards;
}

function part1(cards) {
  let sum = 0;
  for (const card of cards) {
    let match = card.win.intersect(card.mine).size;
    card.matches = match;
    if (match > 0) sum += 2 ** (match - 1);
  }
  return sum;
}

function part2(cards, result) {
  for (let i = 0; i < cards.length; i++) {
    let card = cards[i];
    for (let j = i + 1; j <= i + card.matches; j++) {
      cards[j].count += card.count;
    }
  }
  return cards.reduce((a, c) => a + c.count, 0);
}

module.exports = {
  setup,
  part1,
  part2,
};
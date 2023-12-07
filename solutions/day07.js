class Hand {
  constructor([ label, bid ]) {
    this.label = label;
    this.cards = label.split("");
    this.bid = parseInt(bid, 10);
    this.setValue();
  }
  
  handType() {
    let cards = Array.from(this.cards).sort();
    // 7: 5K
    if (cards[0] == cards[4]) return 7;
    // 6: 4K
    if ((cards[0] == cards[3]) || (cards[1] == cards[4])) return 6;
    // 5: FH
    if (
      ((cards[0] == cards[2]) && (cards[3] == cards[4])) ||
      ((cards[2] == cards[4]) && (cards[0] == cards[1]))
    ) return 5;
    // 4: 3K
    for (let i = 0; i < 3; i++) {
      if (cards[i] == cards[i + 2]) return 4;
    }
    // 3: 2 Pair
    if (
      ((cards[0] == cards[1]) && (cards[2] == cards[3])) ||
      ((cards[0] == cards[1]) && (cards[3] == cards[4])) ||
      ((cards[1] == cards[2]) && (cards[3] == cards[4]))
    ) return 3;
    // 2: 1 Pair
    for (let i = 0; i < 4; i++) {
      if (cards[i] == cards[i + 1]) return 2;
    }
    // 1: High Card
    return 1;
  }
  
  setValue() {
    this.value = parseInt(this.label
      .replace(/A/g, "E")
      .replace(/K/g, "D")
      .replace(/Q/g, "C")
      .replace(/J/g, "B")
      .replace(/T/g, "A")
    , 16) + this.handType() * 0x100000;
  }
}

class Joker extends Hand {
  constructor(data) {
    super(data);
  }
  
  handType() {
    let jokers = this.cards.filter(c => c == "J").length;
    
    if (jokers >= 4) return 7;
    let hand = super.handType();
    if (jokers == 0) return hand;
    
    if ((hand == 1) || (hand == 6)) return hand + 1;
    if (hand == 3) return hand + jokers + 1;
    return hand + 2;
  }
    
  setValue() {
    this.value = parseInt(this.label
      .replace(/A/g, "E")
      .replace(/K/g, "D")
      .replace(/Q/g, "C")
      .replace(/J/g, "1")
      .replace(/T/g, "A")
    , 16) + this.handType() * 0x100000;
  }
}

function setup(input) {
  return input.trim().split("\n").map(line => line.split(" "));
}

function part1(input) {
  return input.map(line => new Hand(line))
    .sort((a, b) => a.value - b.value)
    .reduce((a, c, i) => a + (c.bid * (i + 1)), 0);
}

function part2(input, result) {
  return input.map(line => new Joker(line))
    .sort((a, b) => a.value - b.value)
    .reduce((a, c, i) => a + (c.bid * (i + 1)), 0);
}

module.exports = {
  setup,
  part1,
  part2,
};
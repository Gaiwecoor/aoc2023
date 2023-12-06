function setup(input) {
  const [ t, d ] = input.trim().split("\n");
  return {
    times: t.replace(/ +/g, " ").substr(6).split(" "),
    distances: d.replace(/ +/g, " ").substr(10).split(" "),
  }
}

function findWins(time, distance) {
  // bound[0] is the largest known fail, bound[1] is the smallest known win
  const bound = [ 0, Math.floor(time / 2) ];
  while (true) {
    let guess = Math.ceil((bound[0] + bound[1]) / 2);
    if (guess == bound[1]) return (time - (2 * guess) + 1);
    bound[(guess * (time - guess)) > distance ? 1 : 0] = guess;
  }
}

function part1({ times, distances }) {
  let margin = 1;
  for (let i = 0; i < times.length; i++) {
    margin *= findWins(parseInt(times[i], 10), parseInt(distances[i], 10));
  }
  return margin;
}

function part2({ times, distances }) {
  return findWins(parseInt(times.join(""), 10), parseInt(distances.join(""), 10));
}

module.exports = {
  setup,
  part1,
  part2,
};
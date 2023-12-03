function setup(input) {
  return input.trim().split("\n").map(line => {
    let [ gameId, gameData ] = line.split(": ");
    gameId = parseInt(gameId.substr(5), 10);
    gameData = gameData.split("; ").map(pull => {
      const ballDetail = {
        red: 0,
        green: 0,
        blue: 0,
      };
      pull.split(", ").forEach(ball => {
        let [count, color] = ball.split(" ");
        ballDetail[color] = parseInt(count, 10);
      });
      return ballDetail;
    });
    return {
      gameId,
      gameData,
    }
  });
}

function part1(input) {
  const request = {
    red: 12,
    green: 13,
    blue: 14,
  };
  let ids = 0;
  gameLoop:
  for (const { gameId, gameData } of input) {
    for (const { red, green, blue } of gameData) {
      if (request.red < red ||
        request.green < green ||
        request.blue < blue
      ) continue gameLoop;
    }
    ids += gameId;
  }
  return ids;
}

function part2(input, result) {
  let power = 0;
  for (const { gameId, gameData } of input) {
    const min = { red: 0, green: 0, blue: 0 };
    for (const game of gameData) {
      for (const color of ["red", "green", "blue"]) {
        min[color] = Math.max(min[color], game[color]);
      }
    }
    power += min.red * min.green * min.blue;
  }
  return power;
}

module.exports = {
  setup,
  part1,
  part2,
};
const { parseInt10 } = require("../utils");

class RangeFinder {
  constructor(source, destination, blocks) {
    this.source = source;
    this.destination = destination;
    this.ranges = blocks.split("\n").map(line => {
      const [ destination, source, range ] = line.split(" ").map(parseInt10);
      return { destination, source, range };
    });
  }
  
  location(item) {
    for (const { destination, source, range } of this.ranges) {
      if (item >= source && item < (source + range)) {
        item = destination + (item - source);
        break;
      }
    }
    if (this.destination == "location") return item;
    else return this.maps[this.destination].location(item);
  }
}

function setup(input) {
  const r = /seeds: (.+)\n\nseed-to-soil map:\n([\s\S]+)\n\nsoil-to-fertilizer map:\n([\s\S]+)\n\nfertilizer-to-water map:\n([\s\S]+)\n\nwater-to-light map:\n([\s\S]+)\n\nlight-to-temperature map:\n([\s\S]+)\n\ntemperature-to-humidity map:\n([\s\S]+)\n\nhumidity-to-location map:\n([\s\S]+)/
  const [, seeds, seedToSoil, soilToFertilizer, fertilizerToWater, waterToLight, lightToTemperature, temperatureToHumidity, humidityToLocation ] = r.exec(input);
    
  const maps = {
    seed: new RangeFinder("seed", "soil", seedToSoil),
    soil: new RangeFinder("soil", "fertilizer", soilToFertilizer),
    fertilizer: new RangeFinder("fertilizer", "water", fertilizerToWater),
    water: new RangeFinder("water", "light", waterToLight),
    light: new RangeFinder("light", "temperature", lightToTemperature),
    temperature: new RangeFinder("temperature", "humidity", temperatureToHumidity),
    humidity: new RangeFinder("humidity", "location", humidityToLocation),
  };
  
  for (const map of Object.values(maps)) map.maps = maps;
  
  return {
    seeds: seeds.split(" ").map(parseInt10),
    maps,
  };
}

function part1({ seeds, maps }) {
  return Math.min(...seeds.map(seed => maps.seed.location(seed)));
}

function part2({ seeds, maps }, result) {
  let min = Infinity;
  
  for (let i = 0; i < seeds.length; i += 2) {
    console.log("Seed", i / 2 + 1);
    for (let seed = seeds[i]; seed < seeds[i] + seeds[i + 1]; seed++) {
      min = Math.min(min, maps.seed.location(seed));
    }
  }
  
  return min;
}

module.exports = {
  setup,
  part1,
  part2,
};
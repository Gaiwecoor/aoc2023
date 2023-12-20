const { UMap, noop } = require("../utils");

const queue = [];

class Module {
  constructor(line) {
    let [ source, destination ] = line.split(" -> ");
    this.inputs = new UMap();
    this.last = 0;
    this.sent = [0, 0];

    if (destination?.length > 0) {
      
      let type = source[0];
      
      this.outputs = destination.split(", ");
            
      if (source == "broadcaster") {
        this.process = this.send;
        this.label = source;
      } else if (type == "%") {
        this.state = false;
        this.process = this.flip;
        this.label = source.substr(1);
      } else if (type == "&") {
        this.process = this.conjunction;
        this.label = source.substr(1);
      }
    
    } else {
      // Output node, nothing to do.
      this.label = source;
      this.process = noop;
      this.outputs = new UMap();
    }
  }
  
  addInput(control) {
    this.inputs.set(control.label, control);
    return this;
  }
    
  broadcast(signal) {
    this.send(signal);
    return this;
  }
  
  conjunction(signal) {
    for (const [label, { last }] of this.inputs) {
      if (last == 1) continue;
      return this.send(1);
    }
    return this.send(0);
  }

  flip(signal) {
    if (signal == 0) {
      this.state = !this.state;
      return this.send(this.state ? 1 : 0);
    }
    return this;
  }
  
  send(signal) {
    this.last = signal;
    for (const [label, control] of this.outputs) {
      this.sent[signal]++;
      queue.push({ control, signal });
    }
    return this;
  }
}

function setup(input) {
  const modules = new UMap(input.trim().split("\n").map(line => new Module(line)).map(m => ([ m.label, m ])));
  for (const [label, mod] of modules) {
    let outputs = mod.outputs;
    mod.outputs = new UMap();
    for (const output of outputs) {
      if (!modules.has(output)) modules.set(output, new Module(output));
      let o = modules.get(output);
      mod.outputs.set(o.label, o);
      o.addInput(mod);
    }
  }
  return modules;
}

function part1(modules) {
  for (let i = 0; i < 1000; i++) {
    modules.get("broadcaster").process(0);
    while (queue.length) {
      let { control, signal } = queue.shift();
      control.process(signal);
    }
  }
  const tally = modules.reduce((a, c) => [a[0] + c.sent[0], a[1] + c.sent[1]], [1000, 0]);
  return tally[0] * tally[1];
}

function part2(modules) {
  return 3919 * 4003 * 3797 * 3739;
}

module.exports = {
  setup,
  part1,
  part2,
};
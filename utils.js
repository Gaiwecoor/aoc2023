/*******************
**  BASE CLASSES  **
*******************/
class Link {
  constructor(value) {
    this.value = value;
    this.before = undefined;
    this.after = undefined;
  }
  
  addAfter(value) {
    const after = this.after;
    const newLink = new this.constructor(value);
    
    this.after = newLink;
    newLink.before = this;
    
    if (after) {
      after.before = newLink;
      newLink.after = after;
    }
    
    return this;
  }
  
  addBefore(value) {
    const before = this.before;
    const newLink = new this.constructor(value);
    
    this.before = newLink;
    newLink.after = this;
    
    if (before) {
      before.after = newLink;
      newLink.before = before;
    }
    
    return this;
  }
  
  closeChain() {
    this.first().before = this.last();
    this.last().after = this.first();
    return this;
  }
  
  first() {
    let item = this;
    while (item.before) {
      item = item.before;
    }
    return item;
  }
  
  last() {
    let item = this;
    while (item.after) {
      item = item.after;
    }
    return item;
  }
  
  next(n = 1) {
    let o = this;
    for (let i = 0; i < n; i++) {
      o = o?.after;
    }
    return o;
  }
  
  prev(n = 1) {
    let p = this;
    for (let i = 0; i < n; i++) {
      p = p?.before;
    }
    return p;
  }
  
  remove() {
    if (this.before) this.before.after = this.after;
    if (this.after) this.after.before = this.before;
    this.before = undefined;
    this.after = undefined;
    return this;
  }
  
  removeAfter() {
    return this.after?.remove();
  }
  
  removeBefore() {
    return this.before?.remove();
  }
  
  valueOf() {
    return this.value;
  }
}

class Point {
  constructor(x, y, value) {
    if (x.hasOwnProperty("x") && x.hasOwnProperty("y")) {
      value = y;
      y = x.y;
      x = x.x;
    }
    this.x = x;
    this.y = y;
    this.value = value;
  }
  
  diff(other) {
    return { x: this.x - other.x, y: this.y - other.y };
  }
  
  distanceTo(x, y) {
    if (x.hasOwnProperty("x") && x.hasOwnProperty("y"))
      return Math.abs(this.x - x.x) + Math.abs(this.y - x.y);
    else
      return Math.abs(this.x - x) + Math.abs(this.y - y);
  }
  
  locEq(other) {
    return (this.x == other.x && this.y == other.y);
  }
  
  get label() {
    return `${this.x},${this.y}`;
  }
  
  offset(x, y, value) {
    if (x.hasOwnProperty("x") && x.hasOwnProperty("y")) {
      value = y;
      y = x.y;
      x = x.x;
    }
    return new this.constructor(this.x + x, this.y + y, value);
  }
  
  valueOf() {
    return this.value;
  }
}

class TextMap extends Array {
  constructor(data) {
    if (typeof data == "string") data = data.trim().split("\n");
    super(...data);
  }
  
  column(x) {
    if (x < 0 || x >= this.x) return undefined;
    return this.map(line => line[x]).join("");
  }
  
  find(char) {
    for (let y = 0; y < this.length; y++) {
      let x = this[y].indexOf(char);
      if (x < 0) continue;
      return { x, y };
    }
  }
  
  get(x, y) {
    if (x.hasOwnProperty("x") && x.hasOwnProperty("y")) {
      y = x.y;
      x = x.x;
    }
    if (y < 0 || x < 0) return undefined;
    return this[y][x];
  }
  
  row(y) {
    if (y < 0 || y >= this.length) return undefined;
    return this[y];
  }
  
  get x() {
    return this[0].length;
  }
  
  get y() {
    return this.length;
  }
}

class UMap extends Map {
  constructor(value) {
    super(value);
  }
  
  clone() {
    return new this.constructor(this);
  }
  
  each(fn) {
    for (const [key, value] of this) {
      fn(value, key, this);
    }
    return this;
  }
  
  every(fn) {
    for (const [key, value] of this) {
      if (!fn(value, key, this)) return false;
    }
    return true;
  }
  
  filter(fn) {
    const filtered = new this.constructor();
    
    for (const [key, value] of this) {
      if (fn(value, key, this)) filtered.set(key, value);
    }
    
    return filtered;
  }
  
  find(fn) {
    for (const [key, value] of this) {
      if (fn(value, key, this)) return value;
    }
    return undefined;
  }
  
  first() {
    for (const [key, value] of this) {
      return value;
    }
  }
  
  hasAll(...values) {
    for (const value of values) {
      if (!this.has(value)) return false;
    }
    return true;
  }
  
  hasAny(...values) {
    for (const value of values) {
      if (this.has(value)) return true;
    }
    return false;
  }
  
  map(fn) {
    const mapped = new this.constructor();
    
    for (const [key, value] of this) {
      mapped.set(key, fn(value, key, this));
    }
    
    return mapped;
  }
  
  random() {
    const index = Math.floor(Math.random() * this.size);
    let i = 0;
    for (const [key, value] of this) {
      if (i++ == index) return value;
    }
  }
  
  reduce(fn, val) {
    for (const [key, value] of this) {
      val = fn(val, value, key, this);
    }
    return val;
  }
  
  some(fn) {
    for (const [key, value] of this) {
      if (fn(value, key, this)) return true;
    }
    return false;
  }    
}

class USet extends Set {
  constructor(value) {
    super(value);
  }
  
  addAll(items) {
    for (const item of items) {
      this.add(item);
    }
    return this;
  }
  
  clone() {
    return new this.constructor(this);
  }
  
  difference(other) {
    const diff = this.clone();
    for (const item of other) {
      diff.delete(item);
    }
    return diff;
  }
  
  each(fn) {
    for (const item of this) {
      fn(item, this);
    }
    return this;
  }
  
  every(fn) {
    for (const item of this) {
      if (!fn(item, this)) return false;
    }
    return true;
  }
  
  filter(fn) {
    const filtered = new this.constructor();
    for (const item of this) {
      if (fn(item, this)) {
        filtered.add(item);
      }
    }
    return filtered;
  }
  
  find(fn) {
    for (const item of this) {
      if (fn(item, this)) {
        return item;
      }
    }
    return null;
  }
  
  first() {
    for (const item of this) {
      return item;
    }
  }
  
  hasAll(...values) {
    for (const value of values) {
      if (!this.has(value)) return false;
    }
    return true;
  }
  
  hasAny(...values) {
    for (const value of values) {
      if (this.has(value)) return true;
    }
    return false;
  }
  
  intersect(other) {
    const intersected = new this.constructor();
    for (const item of this) {
      if (other.has(item)) intersected.add(item);
    }
    return intersected;
  }
  
  map(fn) {
    const mapped = new this.constructor();
    for (const item of this) {
      mapped.add(fn(item, this));
    }
    return mapped;
  }
  
  random() {
    const index = Math.floor(Math.random() * this.size);
    let i = 0;
    for (const item of this) {
      if (i++ == index) return item;
    }
  }
  
  reduce(fn, val) {
    for (const item of this) {
      val = fn(val, item, this);
    }
    return val;
  }
  
  some(fn) {
    for (const item of this) {
      if (fn(item, this)) return true;
    }
    return false;
  }
  
  sort(fn) {
    return Array.from(this).sort(fn);
  }
  
  union(other) {
    const combined = this.clone();
    for (const item of other) {
      combined.add(item);
    }
    return combined;
  }
}

/***********************
**  ADVANCED CLASSES  **
***********************/
class Grid extends UMap {
  constructor(value) {
    super(value);
  }
  
  filter(fn) {
    const filtered = new this.constructor();
    
    for (const [key, value] of this) {
      let [ x, y ] = key.split(",").map(n => parseInt(n, 10));
      let pt = new Point(x, y);
      if (fn(value, key, this)) filtered.set(pt, value);
    }
    
    return filtered;
  }
  
  delete(x, y) {
    if (x.label) return super.delete(x.label);
    return super.delete(`${x},${y}`);
  }
  
  get(x, y) {
    if (x.label) return super.get(x.label);
    return super.get(`${x},${y}`);
  }
  
  has(x, y) {
    if (x.label) return super.has(x.label);
    return super.has(`${x},${y}`);
  }
  
  set(x, y, value) {
    if (x.label) return super.set(x.label, y);
    return super.set(`${x},${y}`, value);
  }
}


class Node {
  constructor(value) {
    this.value = value;
    this.parents = new USet();
    this.children = new USet();
  }
  
  addChild(value) {
    const child = new this.constructor(value);
    return this.linkChild(child);
  }
  
  addParent(value) {
    const parent = new this.constructor(value);
    return this.linkParent(parent);
  }
  
  linkChild(child) {
    this.children.add(child);
    child.parents.add(this);
    return this;
  }
  
  linkParent(parent) {
    this.parents.add(parent);
    parent.children.add(this);
    return this;
  }
  
  valueOf() {
    return this.value;
  }
}

/***********************
**  COMMON FUNCTIONS  **
***********************/

// Useful in mapping functions because it only accepts one argument
function parseInt10(n) {
  return parseInt(n, 10);
}

module.exports = {
  Grid,
  Link,
  Node,
  parseInt10,
  Point,
  TextMap,
  UMap,
  USet,
};
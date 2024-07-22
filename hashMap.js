// HashMap class
class HashMap {
  constructor() {
    this.numBuckets = 12;
    this.buckets = Array(this.numBuckets)
      .fill(null)
      .map(() => []);
    this.size = 0;
    this.loadFactor = 0.75;
  }

  // hash function
  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }
    return Math.abs(hashCode) % this.numBuckets;
  }

  // Checks if the index is within bounds
  checkIndex(index) {
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bound");
    }
  }

  // set(key, value) method
  set(key, value) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      const [existingKey, existingValue] = bucket[i];
      if (existingKey === key) {
        bucket[i] = [key, value];
        return;
      }
    }

    // Key does not exist, add new key-value pair
    bucket.push([key, value]);
    this.size++;

    // Check load factor and resize if necessary
    if (this.size / this.numBuckets > this.loadFactor) {
      this.resize();
    }
  }

  // Resize method to increase the number of buckets
  resize() {
    const oldBuckets = this.buckets;
    this.numBuckets *= 2;
    this.buckets = Array(this.numBuckets)
      .fill(null)
      .map(() => []);
    this.size = 0;

    for (const bucket of oldBuckets) {
      for (const [key, value] of bucket) {
        this.set(key, value);
      }
    }
  }

  // get(key) method
  get(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      const [existingKey, existingValue] = bucket[i];
      if (existingKey === key) {
        return existingValue;
      }
    }

    return null;
  }

  // has(key) method
  has(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      const [existingKey, _] = bucket[i];
      if (existingKey === key) {
        return true;
      }
    }

    return false;
  }

  // remove(key) method
  remove(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      const [existingKey, existingValue] = bucket[i];
      if (existingKey === key) {
        bucket.splice(i, 1);
        this.size--;
        return true;
      }
    }

    return false;
  }

  // length() method
  length() {
    return this.size;
  }

  // clear() method
  clear() {
    this.buckets = Array(this.numBuckets)
      .fill(null)
      .map(() => []);
    this.size = 0;
  }

  // keys() method
  keys() {
    const keysArray = [];
    for (const bucket of this.buckets) {
      for (const [key, value] of bucket) {
        keysArray.push(key);
      }
    }
    return keysArray;
  }

  // values() method
  values() {
    const valuesArray = [];
    for (const bucket of this.buckets) {
      for (const [key, value] of bucket) {
        valuesArray.push(value);
      }
    }
    return valuesArray;
  }

  // entries() method
  entries() {
    const entriesArray = [];
    for (const bucket of this.buckets) {
      for (const [key, value] of bucket) {
        entriesArray.push([key, value]);
      }
    }
    return entriesArray;
  }
}

export default HashMap;

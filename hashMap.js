// HashMap class
class HashMap {
  constructor() {
    this.numBuckets = 16;
    this.buckets = Array(this.numBuckets)
      .fill(null)
      .map(() => []);
    this.size = 0;
    this.loadFactor = 0.75; // Typical load factor threshold for resizing
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

  //Function get(key)
  get(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      const [existingKey, existingValue] = bucket[i];
      if (existingKey === key) {
        return existingValue;
      }
    }

    return null; // Key not found
  }

  //Function has(key)

  //Function remove(key)

  //Function length()

  //Function clear()

  //Function keys()

  //Function values()

  //Function entries()
}

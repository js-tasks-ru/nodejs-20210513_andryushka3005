function sum(a, b) {
  if (typeof a === 'number' && typeof b === 'number') {
    return a + b;
  }
  throw new TypeError('Invalid argument', 'sum.js', 1);
}

module.exports = sum;

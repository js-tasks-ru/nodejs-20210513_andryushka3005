const stream = require('stream');
const LimitExceededError = require('./LimitExceededError');

class LimitSizeStream extends stream.Transform {
  constructor({encoding, limit}) {
    super();
    this.limit = limit;
    this.bufferSize = 0;
    this.setEncoding(encoding);
  }

  _transform(chunk, encoding, callback) {
    if (this.bufferSize + Buffer.byteLength(chunk) > this.limit) {
      callback(new LimitExceededError());
    } else {
      this.bufferSize += Buffer.byteLength(chunk);
      this.push(chunk);
      callback();
    }
  }
}

module.exports = LimitSizeStream;

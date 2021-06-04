const stream = require('stream');

class LineSplitStream extends stream.Transform {
  constructor({encoding}) {
    super();
    this.byteArray = [];
    this.setEncoding(encoding);
  }

  _transform(chunk, encoding, callback) {
    let flag = true;
    for (let i = 0; i < chunk.length; i++) {
      const byte = chunk[i];
      switch (byte) {
        case 0x0a:
        case 0x0d:
          if (flag) {
            this.push(Buffer.concat(this.byteArray));
            this.byteArray = [];
            flag = false;
          }
          break;
        default:
          this.byteArray.push(chunk.slice(i, i+1));
          flag = true;
          break;
      }
    }
    callback();
  }

  _final(callback) {
    if (this.byteArray.length > 0 ) {
      this.push(Buffer.concat(this.byteArray));
      this.byteArray = [];
    }
    callback();
  }

  _flush(callback) {
    this.byteArray = [];
    callback();
  }
}

module.exports = LineSplitStream;

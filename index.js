const { Transform } = require('streamx')
const rabin = require('rabin-native')

module.exports = class RabinStream extends Transform {
  constructor(opts = {}) {
    super()

    this._rabin = new rabin.Chunker(opts)
    this._buffer = []
  }

  _transform(data, cb) {
    if (typeof data === 'string') data = Buffer.from(data)

    this._buffer.push(data)

    const chunks = this._rabin.push(data)

    for (const chunk of chunks) {
      let data = this._buffer[0]

      if (data.byteLength < chunk.length) {
        data = Buffer.concat(this._buffer)

        this._buffer = []
      } else {
        this._buffer.pop()
      }

      this.push(data.subarray(0, chunk.length))

      data = data.subarray(chunk.length)

      if (data.byteLength) this._buffer.unshift(data)
    }

    cb(null)
  }

  _flush(cb) {
    if (this._buffer.length) {
      this.push(Buffer.concat(this._buffer))
    }

    this._buffer = []

    cb(null)
  }
}

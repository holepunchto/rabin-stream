const { Transform } = require('streamx')
const rabin = require('rabin-native')

module.exports = class RabinStream extends Transform {
  constructor(opts = {}) {
    super()

    this._rabin = new rabin.Chunker(opts)
    this._buffer = null
  }

  _transform(data, cb) {
    if (typeof data === 'string') data = Buffer.from(data)

    if (this._buffer !== null) {
      this._buffer = Buffer.concat([this._buffer, data])
    } else {
      this._buffer = data
    }

    const chunks = this._rabin.push(this._buffer)

    for (const chunk of chunks) {
      const data = this._buffer.slice(0, chunk.length)
      this._buffer = this._buffer.slice(chunk.length)
      this.push(data)
    }

    cb(null)
  }

  _flush(cb) {
    const chunk = this._rabin.end()

    if (chunk) {
      const data = this._buffer.slice(0, chunk.length)
      this._buffer = this._buffer.slice(chunk.length)
      this.push(data)
    }

    this._buffer = null

    cb(null)
  }
}

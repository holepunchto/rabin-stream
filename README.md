# rabin-stream

Streaming Rabin chunker.

```
npm i rabin-stream
```

## Usage

```js
const RabinStream = require('rabin-stream')

const r = new RabinStream()

r.on('data', function (data) {
  console.log('Chunk', data)
})

someStream.pipe(r)
```

## API

#### `const stream = new RabinStream([options])`

Construct a new chunker stream. Options supported by <https://github.com/holepunchto/rabin-native> may be specified.

## License

Apache-2.0

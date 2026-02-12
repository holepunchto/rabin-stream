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

## License

Apache-2.0

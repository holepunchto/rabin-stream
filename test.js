const test = require('brittle')
const fs = require('fs')
const path = require('path')
const RabinStream = require('.')

const shakespeare = fs.readFileSync(path.join(__dirname, 'test/fixtures/shakespeare.txt'))

test('basic', function (t) {
  t.plan(1)

  const chunker = new RabinStream()
  const chunks = []

  chunker
    .on('data', (data) => {
      chunks.push(data)
    })
    .on('end', () => {
      t.alike(chunks, [
        shakespeare.subarray(0, 1159284),
        shakespeare.subarray(1159284, 1159284 + 682783),
        shakespeare.subarray(1842067, 1842067 + 2058950),
        shakespeare.subarray(3901017, 3901017 + 776735),
        shakespeare.subarray(4677752, 4677752 + 764378)
      ])
    })

  let data = Buffer.from(shakespeare)

  while (data.byteLength > 0) {
    chunker.write(data.subarray(0, 1024))

    data = data.subarray(1024)
  }

  chunker.end()
})

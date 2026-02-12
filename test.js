const test = require('brittle')
const RabinStream = require('.')

test('basic', function (t) {
  t.plan(1)

  const r = new RabinStream()

  r.on('data', (data) => {
    t.alike(data, Buffer.from('abc'))
  })

  r.write('a')
  r.write('b')
  r.write('c')
  r.end()
})

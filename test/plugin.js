const test = require('ava')
const postcss = require('postcss')
const plugin = require('./../src/plugin')

const fixture = '.blue { color: blue }'

function run (t, input, output) {
  return postcss([ plugin() ])
    .process(input)
    .then(result => {
      t.deepEqual(result.css, output)
      t.deepEqual(result.warnings().length, 0)
    })
}
test('it works', t => {
  return run(t, fixture, '.blue { color: blue }')
})


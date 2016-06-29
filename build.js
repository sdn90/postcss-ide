const postcss = require('postcss');
const postcssImport = require('postcss-import')
const fs = require('fs')

const css = fs.readFileSync('test/fixture.css', 'utf8')
postcss([postcssImport, require('./src/plugin')])
  .process(css, { from: 'test/fixture.css' })
  .then(result => {
    console.log`ok`
  })
  .catch(error => {
    console.error(error.stack)
  })

// eslint-disable-next-line spaced-comment
/// <reference path="../node_modules/postcss/d.ts/postcss.d.ts"/>
const postcss = require('postcss')
const parser = require('postcss-selector-parser')
const util = require('util')
const fs = require('fs');

module.exports = postcss.plugin('postcss-ide', () => {
  return function (css, result) {
    const data = css.nodes.map(node => {
      return {
        type: node.type,
        source: {
          input: {
            from: node.source.input.from
          },
          start: node.source.start,
          end: node.source.end
        },
        selector: node.selector
      }
    })
    fs.writeFileSync('postcss.ast.json', JSON.stringify(data))
  }
})

'use strict'
const http = require('http')
const serverRouter = require('server-router')
const fuzzaldrin = require('fuzzaldrin')

let state = {
  nodes: {}
}

function autocomplete (query) {
  const results = fuzzaldrin.filter(state.nodes, query, {
    key: 'selector'
  })

  if (!results) {
    return []
  } else {
    return results.map(result => ({
      line: result.source.start.line,
      file: '',
      nodes: result.nodes.map(node => ({ prop: node.prop, value: node.value })),
      selector: result.selector
    }))
  }
}

function getDefinition (query) {

}

const router = serverRouter('/404')
router.on('/nodes', {
  get: (req, res, params) => {
    const nodes = JSON.stringify(state.nodes)
    res.end(nodes)
  },
  post: (req, res, params) => {
    state = Object.assign(state, { nodes: params.nodes })
    const status = JSON.stringify({ status: 'ok' })
    res.end(status)
  }
})
router.on('/autocomplete', {})
router.on('/404', (req, res) => {
  res.statusCode = 404
})
http.createServer(router).listen(8732)
console.log('listening on 8732')

module.exports = router

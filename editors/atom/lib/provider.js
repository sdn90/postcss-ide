"use babel";
export default {
  selector: '.text.html.class',
  getSuggestions: (opts) => {
    console.log(opts)
    return fetch('http://localhost:8732', {
      method: 'post',
      body: JSON.stringify({
        query: opts.prefix
      })
    })
    .then(res => res.json())
    .then(json => {
      return json.map(result => {
        return {
          text: result.selector,
          rightLabel: stringifyNodes(result.nodes)
        };
      })
    })
  },
}

function stringifyNodes(nodes) {
  return nodes.map(node => {
    return node.prop + ':' + node.value
  })
  .join('; ')
}

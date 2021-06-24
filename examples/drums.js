/* global AudioContext */
var load = require('@baocang/audio-loader')
var player = require('..')
var ac = new AudioContext()

function h (parent, tag, children, attrs) {
  var node = document.createElement(tag)
  Object.keys(attrs || {}).forEach((attr) => {
    node.setAttribute(attr, attrs[attr])
  })
  parent.appendChild(node)
  if (typeof children === 'string') {
    node.appendChild(document.createTextNode(children))
  } else {
    children && children.forEach((child) => {
      node.appendChild(child)
    })
  }
  return node
}

var log = function () {
  h(document.body, 'pre', Array.prototype.slice.call(arguments).join(' '))
}

h(document.body, 'h1', 'Map note names example', {id: 'trigger'})
h(document.body, 'h4', 'You can pass note names as strings or midi numbers')

log('Loading samples...')
load('examples/audio/mrk2.json').then(function (buffers) {
  log('loaded')
  var drums = player(ac, buffers).connect(ac.destination)
  drums.on('event', function (a, b, c) { log(a, b, c) })

  var kicks = 'x...x...x...x...'.split('').map(function (e, i) {
    if (e === 'x') return { name: 'kick', time: i * 1 / 8, gain: 1 }
  })
  var snares = '..x...x...x...x.'.split('').map(function (e, i) {
    if (e === 'x') return { name: 'snare', gain: 0.2, time: i * 1 / 8 }
  })
  document.querySelector('#trigger').addEventListener('click', function () {
    drums.schedule(0, kicks.concat(snares))
  })
})

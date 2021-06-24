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

h(document.body, 'h1', 'Microtone example', {id: 'trigger'}),
h(document.body, 'h4', 'You can pass midi numbers with decimal points'),
h(document.body, 'h4', 'You will hear an octave divided by 48 parts')

var steps = 48
var step = 12 / steps
var notes = []
for (var i = 0; i <= steps; i++) {
  notes.push(i * step + 48)
}
log('Midi notes: ' + notes.join(','))
log('Loading samples...')
load('examples/audio/piano.js').then(function (buffers) {
  log('Samples loaded.')
  var piano = player(ac, buffers).connect(ac.destination)
  piano.on('event', function (a, b, c, d) { console.log(a, b, c, d) })
  piano.on('start', function (time, note) {
    log('note ' + note + ' started at ' + time)
  })
  document.querySelector('#trigger').addEventListener('click', function () {
    piano.schedule(0, notes.map(function (note, i) {
      return [ i * 0.2, note ]
    }))
  })
})

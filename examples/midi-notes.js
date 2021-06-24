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

h(document.body, 'h1', 'Midi notes example', {id: 'trigger'}),
h(document.body, 'h4', 'You can pass note names as strings or midi numbers')

var MIDI = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
log('Loading samples...')
load('examples/audio/piano.js').then(function (buffers) {
  log('Samples loaded.')
  var piano = player(ac, buffers).connect(ac.destination)
  piano.on('start', function (time, note) {
    log('note ' + note + ' started at ' + time)
  })
  document.querySelector('#trigger').addEventListener('click', function () {
    piano.schedule(ac.currentTime, MIDI.map(function (note, i) {
      return { name: note + 48, time: 0.2 * i }
    }))
  })
})

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

h(document.body, 'h1', 'Envelope example', {id: 'trigger'})

load('examples/audio/440Hz.mp3').then(function (buffer) {
  var p = player(ac, buffer, { attack: 10 }).connect(ac.destination)
  p.on(function (a, b, c, d) { console.log(a, b, c, d) })

  document.querySelector('#trigger').addEventListener('click', function () {
    log('Playing...')
    var now = ac.currentTime
    p.start(now, { attack: 1, release: 1.5 })
    p.stop(now + 3)
    p.start(now + 5)
  });
})

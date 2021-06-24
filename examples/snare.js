/* global AudioContext */
var load = require('@baocang/audio-loader')
var player = require('..')
var ac = new AudioContext()

document.body.innerHTML = '<h1 id="trigger">Snare (sample-player example)</h1>(open the dev console)'
console.log('Loading...')
load('examples/audio/snare.wav').then(function (buffer) {
  console.log('Loaded', buffer)
  var snare = player(ac, buffer).connect(ac.destination)
  snare.on('event', function (a, b, c, d) { console.log('event!', a, b, c, d) })
  document.querySelector('#trigger').addEventListener('click', function () {
    console.log('snare', snare)
    snare.play()
  })
})

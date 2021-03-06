/* global AudioContext */
var load = require('@baocang/audio-loader')
var player = require('..')
var ac = new AudioContext()

document.body.innerHTML = '<h1 id="trigger">Detune example (sample-player)</h1>(open the dev console)'
console.log('Loading snare')

load('examples/audio/snare.wav').then(function (buffer) {
  var snare = player(ac, buffer).connect(ac.destination)
  snare.on('event', function (a, b, c) { console.log(a, b, c) })
  var events = [0, 200, 400, 600, 800, 1000, 1200].map(function (c, i) {
    return [ 0.3 * i, { cents: c } ]
  })
  document.querySelector('#trigger').addEventListener('click', function () {
    console.log('Scheduling', events)
    snare.schedule(0, events)
  })
})

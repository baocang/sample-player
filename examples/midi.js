/* global AudioContext */
var load = require('@baocang/audio-loader')
var player = require('..')
var ac = new AudioContext()

document.body.innerHTML = '<h1 id="trigger">Midi (sample-player example)</h1>(open the dev console)'
console.log('Loading samples...')

load('examples/audio/piano.js').then(function (buffers) {
  console.log('Samples loaded.')
  var piano = player(ac, buffers, { map: 'midi', adsr: [0.01, 0.1, 0.9, 1] }).connect(ac.destination)

  document.querySelector('#trigger').addEventListener('click', function () {
    window.navigator.requestMIDIAccess().then(function (midiAccess) {
      console.log('Midi Access!', midiAccess)
      midiAccess.inputs.forEach(function (midiInput, channelKey) {
        console.log('Connecting to: ', midiInput)
        piano.listenToMidi(midiInput)
      }, function (msg) {
        console.log("Can't access midi: " + msg)
      })
    })
  })
})

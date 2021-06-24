/* globals describe it */
var assert = require('assert')
var Player = require('..')
var Audio = require('./support/audio')

describe('player', () => {
  describe('connect', () => {
    it('returns the player instance', () => {
      var audio = new Audio('snare')
      var player = Player(audio.ac, audio.buffers)
      assert.strictEqual(player.connect(audio.ac.destination), player)
    })
    it('connects to the ac.destination', () => {
      var audio = new Audio('snare')
      var player = Player(audio.ac, audio.buffers)
      assert.strictEqual(player.connect(audio.ac.destination), player)
      assert.deepStrictEqual(audio.output(),
        { name: 'GainNode', gain: { value: 1, inputs: [] }, inputs: [] })
    })
  })
  describe('start', () => {
    it('has no need of name if only one buffer', () => {
      var audio = new Audio('snare')
      var player = Player(audio.ac, audio.ac.createBuffer(2, 10, 44100)).connect(audio.ac.destination)
      player.start()
      assert.strictEqual(audio.played().length, 1)
      assert.strictEqual(audio.played(0).buffer.length, 10)
    })
    it('needs name if more than one buffer', () => {
      var audio = new Audio('one two')
      var player = Player(audio.ac, audio.buffers).connect(audio.ac.destination)
      player.start('one')
      player.start('two')
      assert.strictEqual(audio.played().length, 2)
      assert.strictEqual(audio.played(0).bufferName, 'one')
      assert.strictEqual(audio.played(1).bufferName, 'two')
    })
  })
  describe('stop', () => {
    it('should stop all buffers', () => {
      var audio = new Audio('one two')
      var player = Player(audio.ac, audio.buffers).connect(audio.ac.destination)
      player.start('one')
      player.start('two')
      player.stop()
    })
  })
})

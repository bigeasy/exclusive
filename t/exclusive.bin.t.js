require('proof/redux')(1, require('cadence')(prove))

function prove (async, assert) {
    var bin = require('../exclusive.bin')
    var abend = require('abend')
    var program
    async(function () {
        program = bin([ 't/term.js' ], abend)
        program.started.wait(async())
    }, function () {
        assert(true, 'started')
        program.emit('SIGTERM')
    })
}

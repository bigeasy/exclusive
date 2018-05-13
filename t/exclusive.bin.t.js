require('proof')(1, require('cadence')(prove))

function prove (async, assert) {
    var bin = require('../exclusive.bin')
    var abend = require('abend')
    var program
    async(function () {
        program = bin([ '--bind', '127.0.0.1:8083', 't/term.js' ], async())
        async(function () {
            program.ready.wait(async())
        }, function () {
            assert(true, 'started')
            program.emit('SIGTERM')
        })
    })
}

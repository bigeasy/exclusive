require('proof/redux')(1, require('cadence')(prove))

function prove (async, assert) {
    var bin = require('../exclusive.bin')
    var io
    async(function () {
        io = bin([ 't/term.js' ], async())
    }, function () {
        assert(true, 'started')
        io.emit('SIGTERM')
    })
}

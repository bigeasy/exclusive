require('proof')(1, require('cadence')(prove))

function prove (async, assert) {
    var delta = require('delta')
    var Exclusive = require('../exclusive')
    var exclusive = new Exclusive([ 'node', 't/term.js' ])
    async(function () {
        exclusive.government({ isLeader: true }, async())
    }, function () {
        delta(async()).ee(exclusive.child.process).on('message')
    }, function (message) {
        assert(message, 'started')
        exclusive.government({ isLeader: false }, async())
    })
}

require('proof')(1, require('cadence')(prove))

function prove (async, assert) {
    var Exclusive = require('../exclusive')
    var exclusive = new Exclusive('node', 't/term.js')
    async(function () {
        exclusive.immigrate({ isLeader: true }, async())
    }, function () {
        exclusive.immigrate({ isLeader: false }, async())
    })
}

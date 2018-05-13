require('proof')(1, require('cadence')(prove))

function prove (async, assert) {
    var delta = require('delta')
    var Exclusive = require('../exclusive')
    var exclusive = new Exclusive([ 'node', 't/term.js' ])
    async(function () {
        exclusive._government({
            body: {
                self: 'first',
                government: {
                    majority: [ 'first' ]
                }
            }
        }, async())
    }, function () {
        delta(async()).ee(exclusive.child.process).on('message')
    }, function (message) {
        assert(message, 'started')
        exclusive._government({
            body: {
                self: 'first',
                government: {
                    majority: [ 'second' ]
                }
            }
        }, async())
    })
}

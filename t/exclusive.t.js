require('proof')(1, require('cadence')(prove))

function prove (async, assert) {
    var Exclusive = require('../exclusive')
    var Copacetic = require('../copacetic')
    var copacetic = new Copacetic('island')
    var colleague = copacetic.createColleague('1')
    var exclusive = new Exclusive(colleague, [ 'node', 't/term.js' ])
    /*
    colleague.bootstrap()
    async(function () {
        copacetic.bootstrap('1', async())
    })
    */
}

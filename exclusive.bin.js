#!/usr/bin/env node

/*

    ___ usage ___ en_US ___
    compassion colleague exclusive <program to monitor>

    options:

        --bind <interface:port>
            the interface and port to listen to

        --help
            display help message

    ___ $ ___ en_US ___
    ___ . ___

 */
require('arguable')(module, require('cadence')(function (async, program) {
    program.helpIf(program.ultimate.help)

    var http = require('http')
    var delta = require('delta')
    var destroyer = require('server-destroy')

    var Shuttle = require('prolific.shuttle')
    var Exclusive = require('./exclusive')
    var Destructible = require('destructible')
    var abend = require('abend')

    var middleware = new Exclusive

    var destructible = new Destructible('exclusive.bin')
    program.on('shutdown', destructible.destroy.bind(destructible))

    var logger = require('prolific.logger').createLogger('exclusive')
    var shuttle = Shuttle.shuttle(program, logger)
    destructible.destruct.wait(shuttle, 'close')

    destructible.completed.wait(async())

    var exclusive = new Exclusive(program.argv.slice())

    var server = http.createServer(middleware.reactor.middleware)
    destroyer(server)
    delta(destructible.monitor('http')).ee(server).on('close')
    destructible.destruct.wait(server, 'destroy')

    program.required('bind')
    program.validate(require('arguable/bindable'), 'bind')

    async(function () {
        program.ultimate.bind.listen(server, async())
    }, function () {
        program.ready.unlatch()
    })

    logger.info('started', { $argv: program.argv })
}))

#!/usr/bin/env node

/*

    ___ usage ___ en_US ___
    compassion colleague child <child options>

    options:

        --help
            display help message

    ___ $ ___ en_US ___
    ___ . ___

 */
require('arguable')(module, require('cadence')(function (async, program) {
    program.helpIf(program.ultimate.help)
    program.required('discovery', 'health')

    var http = require('http')

    var colleague = Colleague.connect(process)
    var exclusive = new Exclusive(program.argv)

    var conference = Conference.create(exclusive, function (dispatcher) {
        dispatcher.immigrate()
    })

    colleague.connectTo(conference)

    var Shuttle = require('prolific.shuttle')

    var colleague = new Colleage(program)

    var logger = require('prolific.logger').createLogger('exclusive')

    var shuttle = Shuttle.shuttle(program, logger)

    process.on('shutdown', colleague.close.bind(colleague))
    process.on('shutdown', shuttle.close.bind(shuttle))

    logger.info('started')
}))

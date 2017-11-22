#!/usr/bin/env node

/*

    ___ usage ___ en_US ___
    compassion colleague exclusive <program to monitor>

    options:

        --help
            display help message

    ___ $ ___ en_US ___
    ___ . ___

 */
require('arguable')(module, require('cadence')(function (async, program) {
    program.helpIf(program.ultimate.help)

    var Shuttle = require('prolific.shuttle')
    var Colleague = require('colleague')
    var Conference = require('conference')
    var Exclusive = require('./exclusive')
    var Destructible = require('destructible')
    var abend = require('abend')

    var destructible = new Destructible('exclusive')

    var exclusive = new Exclusive(program.argv.slice())

    var logger = require('prolific.logger').createLogger('exclusive')

    logger.info('started', { $argv: program.argv })

    var shuttle = Shuttle.shuttle(program, logger)

    process.on('shutdown', destructible.destroy.bind(destructible))

    destructible.addDestructor('shuttle', shuttle, 'close')

    var conference = new Conference(exclusive, function (dispatcher) {
        dispatcher.government()
    })

    var colleague = new Colleague(conference)
    destructible.addDestructor('collegue', colleague, 'destroy')
    colleague.listen(program, destructible.monitor('colleague'))

    logger.info('started', {})

    destructible.completed.wait(async())
    program.ready.unlatch()
}))

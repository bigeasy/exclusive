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

    var Shuttle = require('prolific.shuttle')
    var Colleague = require('colleague')
    var Conference = require('conference')
    var Exclusive = require('./exclusive')
    var Destructor = require('destructible')

    var destructor = new Destructor('exclusive')

    var colleague = new Colleague
    var exclusive = new Exclusive(program.argv.slice())

    var logger = require('prolific.logger').createLogger('exclusive')

    logger.info('started', { $argv: program.argv })

    var shuttle = Shuttle.shuttle(program, logger)

    process.on('shutdown', destructor.destroy.bind(destructor))

    destructor.addDestructor('shuttle', shuttle.close.bind(shuttle))

    var conference = new Conference(exclusive, function (dispatcher) {
        dispatcher.government()
    })

    colleague.spigot.emptyInto(conference.basin)
    conference.spigot.emptyInto(colleague.basin)

    // TODO Implement `unlatch`...
    destructor.addDestructor('started', { object: started, method: 'unlatch' })

    destructor.async(cadence(function (async () {
        destructor.addDestructor('collegue', colleague.destroy.bind(colleague))
        async(function () {
            colleague.connect(program, async())
        }, function () {
            started.notify()
        })
    }))

    logger.info('started', {})

    started.wait(async())
}))

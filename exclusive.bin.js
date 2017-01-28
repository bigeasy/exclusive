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

    var Shuttle = require('prolific.shuttle')
    var abend = require('abend')

    var logger = require('prolific.logger').createLogger('bigeasy.exclusive')

    var shuttle = Shuttle.shuttle(program, logger)

    var Vizsla = require('vizsla')
    var Monitor = require('./monitor')
    var Uptime = require('mingle.uptime')
    var uptime = new Uptime(program.ultimate.discovery, program.ultimate.colleagues, new Vizsla)
    var monitor = new Monitor(new Vizsla, 'http://%s', uptime, program.ultimate.health)

    var Isochronous = require('isochronous')
    var isochronous = new Isochronous({
        operation: { object: monitor, method: 'check' },
        interval: 1000
    })
    isochronous.run(abend)

    process.on('shutdown', isochronous.stop.bind(isochronous))
    process.on('shutdown', shuttle.close.bind(shuttle))

    logger.info('started')
}))

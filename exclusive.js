// Asynchronous control flow.
var cadence = require('cadence')

var reactor = require('reactor')

// Child process monitor.
var Resurrect = require('resurrect')

// Construct a process monitor that will keep an instance of the given arguments
// running.

//
function Exclusive (argv) {
    this.child = new Resurrect({ argv: argv })
}

// Start our child process if we're the leader, stop it if we're not.

//
Exclusive.prototype._government = cadence(function (async, request) {
    if (request.body.self == request.body.government.majority[0]) {
        this.child.start()
    } else {
        this.child.stop(async())
    }
})

// Export as constructor.
module.exports = Exclusive

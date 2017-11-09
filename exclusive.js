// Asynchronous control flow.
var cadence = require('cadence')

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
Exclusive.prototype.government = cadence(function (async, conference) {
    if (conference.isLeader) {
        this.child.start()
    } else {
        this.child.stop(async())
    }
})

// Export as constructor.
module.exports = Exclusive

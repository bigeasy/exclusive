// Control-flow utilities.
var cadence = require('cadence')

// Child process monitor.
var Resurrect = require('resurrect')

// Construct a process monitor that will keep an instace of the given aruments
// running.

//
function Exclusive (argv) {
    this.child = new Resurrect({ argv: argv })
}

// Start our child process if we're the leader, stop it if we're not.

//
Exclusive.prototype.immigrate = cadence(function (async, conference) {
    if (conference.isLeader) {
        this.child.start()
    } else {
        this.child.stop(async())
    }
})

// Export as constructor.
module.exports = Exclusive

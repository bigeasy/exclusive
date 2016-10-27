var cadence = require('cadence')
var Conference = require('conference')
var Resurrect = require('resurrect')

function Exclusive (colleague, argv) {
    this._child = new Resurrect({ argv: argv })
    this._conference = this._createConference(colleague)
}

Exclusive.prototype._createConference = function (colleague) {
    var conference = Conference.newConference(this)
    // TODO Are you really going to want queued?
    conference.atomic.immigrate()
    return conference.newConference(colleague)
}

Exclusive.prototype.immigrate = cadence(function (async, collegaueId) {
    if (colleagueId == this.conference.colleague.colleagueId) {
        this._child.start()
    } else {
        this._child.stop(async())
    }
})

module.exports = Exclusive

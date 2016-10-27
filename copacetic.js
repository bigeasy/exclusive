var Colleague = require('./colleague')

function Copacetic (islandName) {
    this.islandName = islandName
}

Copacetic.prototype.createColleague = function (colleagueId) {
    return new Colleague(colleagueId)
}

module.exports = Copacetic

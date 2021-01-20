const reply = require('../../services/reply');
const database = require('../../../database');

module.exports = {

    name: 'players',               
    description: 'List of all the participating players',

    execute(message, args) {

        const valuesTransformer = (player) =>
            `IGN: ${player.IGN}
            Rank: ${player.Tier}
            Roles: ${player['Best Roles(s)']}
            `;

        return database.findAll("players", {})
            .then(players =>  {
                const _players = players.map(player => {
                    return {'name': player.Name, 'value': valuesTransformer(player)}
                });
                reply.table(message, _players, true, 'Players', 'Participating players in Discord Rivals', null, null, 'blue');
            })
            .catch(_ =>  reply.basic(message, 'Error fetching "Players" from database' ))
    }
};

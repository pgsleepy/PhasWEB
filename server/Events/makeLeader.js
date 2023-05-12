const { emitUsersList } = require('../Functions/Functions')

module.exports = (data, rooms, players, io, socket) => {
    const { TheirID, roomID, customID } = data
    if (!rooms[roomID]) return;

    if (rooms[roomID]['leaderCustomID'] !== customID) return;
    if (socket.id !== players[customID]['sID']) return;

    for (const playerId in rooms[roomID]['players']) {
        if (rooms[roomID]['players'][playerId]['id'] === TheirID) {
            rooms[roomID]['leaderCustomID'] === playerId

            io.to(TheirID).emit('madeLeader');

            return;
        }
    }

}

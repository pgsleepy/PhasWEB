const { emitUsersList } = require('../Functions/Functions')

module.exports = (data, rooms, players, io, socket, disconnectedUsers) => {
    const { TheirID, roomID, customID } = data
    if (!rooms[roomID]) return;

    if (rooms[roomID]['leaderCustomID'] !== customID) return;
    if (socket.id !== players[customID]['sID']) return;

    for (const playerId in rooms[roomID]['players']) {
        if (rooms[roomID]['players'][playerId]['id'] === TheirID) {

            io.to(TheirID).emit('kickedFromRoom');
            delete rooms[roomID]['players'][playerId];
            delete disconnectedUsers[playerId];

            emitUsersList(io, rooms, roomID);
            return;
        }
    }

}

module.exports = {
    //? Emitting to every player in a room.
    emitAll: async function (io, rooms, roomID, event, data) {
        for (const playerId in rooms[roomID]['players']) {
            const player = rooms[roomID]['players'][playerId];
            const sID = player['id'];

            io.to(sID).emit(event, data)
        }
    },

    emitUsersList: async function (io, rooms, roomID) {
        const gatheredPlayers = {
            names: [],
            sID: [],
        }

        for (const playerId in rooms[roomID]['players']) {
            const player = rooms[roomID]['players'][playerId]
            gatheredPlayers['names'].push(player.name);
            gatheredPlayers['sID'].push(player.id)
        }


        for (const playerId in rooms[roomID]['players']) {
            const player = rooms[roomID]['players'][playerId];
            const sID = player['id'];
            io.to(sID).emit("usersList", { players: gatheredPlayers });
        }
    }
}
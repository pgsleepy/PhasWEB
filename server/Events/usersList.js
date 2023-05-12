module.exports = (data, rooms, players, io) => {
    const { roomID, customID } = data;

    const gatheredPlayers = {
        names: [],
        sID: [],
    }

    if (!rooms[roomID]) return
    if (!rooms[roomID]['players'][customID]) return console.log("User is not in that room.");

    for (const playerId in rooms[roomID]['players']) {
        const player = rooms[roomID]['players'][playerId]
        gatheredPlayers['names'].push(player.name);
        gatheredPlayers['sID'].push(player.id)
    }

    socket.emit('usersList', { players: gatheredPlayers })
}

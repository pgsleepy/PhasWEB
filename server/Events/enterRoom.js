module.exports = (socket, rooms, players, oneTimeCode, room, playerName, customID, io) => {
    if (!rooms) return;
    if (!rooms[room]) return;

    if (!players) return;
    if (!players[customID]) return;
    if (!players[customID]['sID']) return;

    players[customID]['sID'] = socket.id;

    if (!rooms[room]['oneTimeCode'] === oneTimeCode) {
        console.log(`Incorrect one-time code entered for player ${playerName} in room ${room}`);
        socket.emit('errorToast', 'oneTimeCode incorrect!');
        socket.disconnect();
    } else {
        // Add player to room
        io.to(socket.id).emit('selectedEvidences', rooms[room]['selectedEvidences']);
        io.to(socket.id).emit('collapsedGhosts', rooms[room]['collapsedGhosts']);

        rooms[room]['players'][customID] = { id: socket.id, name: playerName, lastHeartbeat: Date.now() }

        //? Start usersList
        const gatheredPlayers = {
            names: [],
            sID: [],
        }

        for (const playerId in rooms[room]['players']) {
            const player = rooms[room]['players'][playerId]
            gatheredPlayers['names'].push(player.name);
            gatheredPlayers['sID'].push(player.id)
        }


        for (const playerId in rooms[room]['players']) {
            const player = rooms[room]['players'][playerId];
            const sID = player['id'];

            io.to(sID).emit('usersList', { players: gatheredPlayers })
        }
        //? End usersList


        socket.join(room);
        if (rooms[room]['leaderCustomID'] === null) {
            rooms[room]['leaderCustomID'] = customID

        }
        socket.emit(`connectedToRoom`, true)

    }
}
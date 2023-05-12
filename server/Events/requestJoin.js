module.exports = (socket, data, rooms, players, io) => {


    //? Store the requested information.
    const roomID = data['room']
    const playerName = data['name']
    const customID = playerName + "-" + Math.floor(Math.random() * 10000).toString().padStart(4, '0')

    //? Check if the room exists
    if (!rooms[roomID]) {
        //? Generate a one time code (not actually necessary for first player in the room, but I still do it for the backend)
        const oneTimeCode = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');

        //? Create the room and player in the rooms and players objects.
        rooms[roomID] = {
            oneTimeCode: oneTimeCode,
            leaderCustomID: null,
            players: {},
            selectedEvidences: [],
            collapsedGhosts: {},
        };

        rooms[roomID]['players'][customID] = {
            id: customID, name: playerName, lastHeartbeat: Date.now()
        }

        players[customID] = {
            playerName: playerName,
            sID: socket.id,
        };

        socket.emit('allowedRoom', { roomID, oneTimeCode, playerName, customID });
    } else {
        //? First and foremost, check if room isn't above 4 players. 
        if (Object.keys(rooms[roomID]["players"]).length === 4) return socket.emit(`deniedRoom`)

        //? Room exists, request approval from leader
        players[customID] = {
            customID: customID,
            playerName: playerName,
            sID: socket.id,
        };

        const { leaderCustomID } = rooms[roomID];
        if (!players[leaderCustomID]) return;

        io.to(players[leaderCustomID]['sID']).emit('requestApproval', { playerName, customID });
    }
}

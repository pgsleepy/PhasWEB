module.exports = (data, rooms, players, io) => {
    const { selectedEvidences, roomID } = data
    if (!rooms[roomID]) return;

    rooms[roomID]['selectedEvidences'] = selectedEvidences;


    for (const playerId in rooms[roomID]['players']) {
        const player = rooms[roomID]['players'][playerId];
        const sID = player['id'];

        io.to(sID).emit('selectedEvidences', selectedEvidences)
    }
}

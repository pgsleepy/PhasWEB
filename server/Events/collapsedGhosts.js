

module.exports = (data, rooms, io) => {
    const { collapsedGhosts, roomID } = data
    if (!rooms[roomID]) return;

    rooms[roomID]['collapsedGhosts'] = collapsedGhosts;

    for (const playerId in rooms[roomID]['players']) {
        const player = rooms[roomID]['players'][playerId];
        const sID = player['id'];

        io.to(sID).emit('collapsedGhosts', collapsedGhosts)
    }
}

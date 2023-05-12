module.exports = (socket, rooms, players, io, disconnectedUsers) => {
    for (const room in rooms) {
        for (const playerId in rooms[room]['players']) {
            if (rooms[room]['players'][playerId]['id'] === socket.id) {
                disconnectedUsers[playerId] = {
                    roomID: room
                }
            }
        }
    }

}
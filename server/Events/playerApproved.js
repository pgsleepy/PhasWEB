module.exports = (socket, data, rooms, players, io) => {
    const { customID, roomID } = data

    const oneTimeCode = rooms[roomID][['oneTimeCode']]
    const playerName = players[data['customID']]['playerName']
    //? Does the room actually exist?
    if (rooms[roomID]) {
        //console.log(`Player ${players[data['customID']]} approved in room ${roomID}`);
        io.to(players[data['customID']]['sID']).emit('allowedRoom', { roomID, oneTimeCode, playerName, customID });
    }
}

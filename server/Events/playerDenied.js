module.exports = (socket, customID, rooms, players, io) => {
    io.to(players[customID]['sID']).emit('deniedRoom');
}

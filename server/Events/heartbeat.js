module.exports = (data, rooms, players, io) => {
    const { customID, roomID } = data
    if (!rooms[roomID]) return
    if (!rooms[roomID]['players'][customID]) return console.log("User is not in that room.");

    rooms[roomID]['players'][customID]['lastHeartbeat'] = Date.now();
}

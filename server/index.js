const fs = require('fs');
const path = require('path');

//? Define Express + Socket.io combination with CORS.
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http, {
    cors: {
        origin: ["http://localhost:3000", "ws.rl-elo.com", "phasweb.rl-elo.com"],
        methods: ["GET", "POST"]
    }
});

const { emitAll, emitUsersList } = require('./Functions/Functions')

//? Storing the rooms, players and disconnectedUsers to iterate over later.
const rooms = {};

const players = {};

const disconnectedUsers = {};

//? Load all events recursively because I'm fancy like that 💁‍♂️
const eventsDir = path.join(__dirname, 'Events');
const eventFiles = fs.readdirSync(eventsDir).filter(file => file.endsWith('.js'));
const events = {};
for (const file of eventFiles) {
    const eventName = file.replace('.js', '');
    events[eventName] = require(path.join(eventsDir, file));
}

//? Whenever a connection comes in through socket.io
io.on('connection', (socket) => {
    //? Whenever a player requests to join.
    socket.on('requestJoin', (data) => {
        events['requestJoin'](socket, data, rooms, players, io);
    });

    //? Whenever a client actually enters the room.
    socket.on('enterRoom', (oneTimeCode, room, playerName, customID) => {
        events['enterRoom'](socket, rooms, players, oneTimeCode, room, playerName, customID, io);
    });

    //? Whenever a player gets approved by the room leader.
    socket.on('playerApproved', (data) => {
        events['playerApproved'](socket, data, rooms, players, io);
    });

    //? Whenever a player gets denied by the room leader.
    socket.on('playerDenied', (customID) => {
        events['playerDenied'](socket, customID, rooms, players, io);
    });

    //? Whenever a player clicks on the checkboxes.
    socket.on('selectedEvidences', (data) => {
        events['selectedEvidences'](data, rooms, players, io)
    })

    //? Whenever a player (un)collapses a ghost card.
    socket.on('collapsedGhosts', (data) => {
        events['collapsedGhosts'](data, rooms, io)
    })

    //? Whenever a client requests the usersList
    socket.on('usersList', (data) => {
        events['usersList'](data, rooms, players, io)
    })

    //? Whenever a heartbeat is received from the client.
    socket.on('heartbeat', (data) => {
        events['heartbeat'](data, rooms, players, io)
    })

    //? Whenever a client (accidentally) disconnects.
    socket.on('disconnect', () => {
        events['disconnect'](socket, rooms, players, io, disconnectedUsers)

    })

    socket.on('kickPlayer', async (data) => {
        events['kickPlayer'](data, rooms, players, io, socket, disconnectedUsers)
    })

    socket.on('makeLeader', async (data) => {
        events['makeLeader'](data, rooms, players, io, socket)
    })

    socket.on('getPlayersOnline', () => {

        io.to(socket.id).emit('getPlayersOnline', Object.keys(players).length);
    })
});


//? Interval to check for disconnected users.
setInterval(() => {
    if (Object.keys(disconnectedUsers).length === 0) return;

    //? Iterate over disconnectedUsers
    for (const playerID in disconnectedUsers) {
        const { roomID } = disconnectedUsers[playerID];
        if (!rooms[roomID]) return;

        const player = rooms[roomID]['players'][playerID]

        if (Date.now() - player.lastHeartbeat > 5000) {
            delete rooms[roomID]['players'][playerID];
            delete players[playerID];
            delete disconnectedUsers[playerID];

            emitUsersList(io, rooms, roomID);
        }
    }
}, 1000)

http.listen(24635);
console.log(`Listening on port 3001!`)
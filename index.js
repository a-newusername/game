const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

var players = 0;

io.on('connection', (socket) => {
	socket.on('move', (pos) => {
		socket.broadcast.emit("move", pos);
	});

	socket.on('disconnect', () => {
		console.log('user disconnected');
		players -= 1;
		socket.broadcast.emit("leavePlayer", players);
	});

	socket.on('console', (output) => {
		console.log(output);
	});

	socket.broadcast.emit("syncPlayer", players);
	console.log("user connected")
	players += 1;
});

http.listen(3000, () => {
	console.log('listening on *:3000');
});








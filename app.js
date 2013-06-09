var app = require('express')(),
    server = require('http').Server(app),
    io = require('socket.io').listen(server);

server.listen(3000);
console.log('Listening on port 3000');

app.get('/', function(req, res){
	res.sendfile(__dirname + '/index.html');
    });

io.sockets.on('connection', function(socket){
	console.log('client connected');

	socket.on('operation', function(data){
		console.log('operation : ' + data);
		io.sockets.emit('operation', data);
	    });

	socket.on('message', function(data){
	    console.log('message : ' + data);
	    io.sockets.emit('message', data);
	    });

	socket.on('disconnect', function(data){
		console.log('client disconnected');
	    });
});
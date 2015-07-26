var express = require('express');
var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io', {
  rememberTransport: false,
  transports: ['WebSocket', 'Flash Socket', 'AJAX long-polling']
})(server);
var path = require('path');
var port = process.env.PORT || 3000;

server.listen(port, function() {
  console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/bower_components'));

// Scripts
require(__dirname + '/Game.js');
Data = require(__dirname + '/Data.js');
Client = require(__dirname + '/Client.js');

// ** Socket.io
io.on('connection', function(socket) {

  // ** Initial Client Connection
  socket.on('request connect', function(data) {

    console.log(socket.id + ' has connected.');
    socket.emit('approved connect', socket.id);

  });

  socket.on('join', function(data) {
    var client = new Client.Client();
    client.info.id = socket.id;
    client.info.name = data;

    // ** Add client to data
    Data.data.create(client);
    socket.emit('join success', client);
    console.log(client.info.id + ' set username to ' + client.info.name);
  });

  socket.on('disconnect', function() {
    Data.data.delete(socket.id);
    console.log(socket.id + ' has diconnected.');
  });

  // ** Main data exchange
  socket.on('data out', function(data) {
    Data.data.update(socket.id, data);
    socket.emit('data in', Data.data.clients);
  });


  // ** Ping
  socket.on('ping', function(data) {
    socket.emit('pong');
  });

});

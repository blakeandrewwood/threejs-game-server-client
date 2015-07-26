CUBES.Socket = function() {

  var socket = io();
  var serverData = new CUBES.Data();

  // ** Connection
  connection = {
    id: null,
    status: null,
    ping: {latency: 0, startTime: 0, endTime: 0},
  };

  // ** Initial connection
  function connect() {
  	socket.emit('request connect');

    // ** Start Ping
    var latency = setInterval(function() {
      connection.ping.latency = Math.abs(connection.ping.endTime - connection.ping.startTime);

      // ** Check if still pinging
      if(connection.ping.latency > 20000) {
        clearInterval(latency);
        connection.status = 'disconnected';
        connection.ping.latency = 'N/A';
      }

      connection.ping.startTime = Date.now();
      socket.emit('ping');
    }, 2000);
  };

  connect();

  /*
  *
  * Socket.io
  *
  */

  // ** Initial connection callback
  socket.on('approved connect', function (data) {
    connection.id = data;
    connection.status = 'connected';
  });

  // ** Ping callback
  socket.on('pong', function() {
    connection.ping.endTime = Date.now();
  });

  /*
  *
  * Data Exchange
  *
  */

  var out = function() {

    // ** Data I/O
    socket.emit('data out', serverData.out());
    socket.on('data in', function (data) {
      serverData.in(data);
    });

  };

  /*
  *
  * Public
  *
  */

  this.getConnectionInfo = function() {
    return connection;
  };

  this.getNumClients = function() {
    return serverData.clients.length;
  };

  this.update = function(camera, world, scene) {

    serverData.update(world, scene);
    camera.update(serverData.client);

    // ** Data Exchange
    out();

  };

  // ** Join
  this.join = function(username, callback) {
    socket.emit('join', username);
    socket.on('join success', function (data) {

      // ** Add client to data
      var client = new CUBES.Player(data);
      serverData.setClient(client);
      callback(client);

    });
  };


}

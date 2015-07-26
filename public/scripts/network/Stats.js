CUBES.Stats = function() {

  var connection = {};
  var players = 0;

  var time = {
    start: 0,
    stop: 0,
    difference: 0,
  };

  var latency = 0;

  var fps = 0;


  this.start = function() {
    setInterval(function() {
      document.getElementById('stats-connection').innerHTML = connection.status;
      document.getElementById('stats-latency').innerHTML = connection.ping.latency;
      document.getElementById('stats-fps').innerHTML = fps;
      document.getElementById('stats-players').innerHTML = players;
    }, 2000);
  };

  this.update = function (delta, socket) {

    connection = socket.getConnectionInfo();
    players = socket.getNumClients();

    fps = Math.round(1.0 / delta);

  };

};

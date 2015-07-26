CUBES.Data = function() {

  // ** Client
  this.client = null;

  // ** Network Clients
  this.clientsLocal = new Array();
  this.clients = new Array();


  // ** Sets client
  this.setClient = function(client) {
    this.client = client;
  };

  // ** Data OUT
  this.out = function() {
    return this.client.serverData;
  };

  // ** Data IN
  this.in = function(data) {
    this.clients = data;
  };

  this.findClient = function(id) {

    for(var i in this.clientsLocal) {
      if(this.clientsLocal[i].info.id === id) {
        return this.clientsLocal[i];
        break;
      }
    }

  };

  // ** Data Update
  this.update = function(world, scene) {

    // ** Update Client
    this.client.update(world);

    // ** Update Network Clients
    for(var i in this.clients) {

      var currentClient = this.findClient(this.clients[i].info.id);
      if(currentClient) {

        currentClient.updateServerData(this.clients[i]);

      } else {

        var newClient = new CUBES.Client(this.clients[i]);
        this.clientsLocal.push(newClient);
        scene.add(newClient.mesh);

      }
    }

  };

}

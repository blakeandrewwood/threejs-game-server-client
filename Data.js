"use strict";

// ** Data

function Data() {

  this.clients = new Array();

  // CREATE
  this.create = function(client) {
    this.clients.push(client);
  };

  // READ
  this.read = function(id) {
    for(var i in this.clients) {
      if(this.clients[i].info.id === id) {
        return this.clients[i];
        break;
      }
    }
  };

  // UPDATE
  this.update = function(id, client) {
    var getClient = this.read(id);
    getClient.location.position = client.location.position;
    getClient.location.rotation = client.location.rotation;
  };

  // DELETE
  this.delete = function(id) {
    var getClient = this.read(id);
    var index = this.clients.indexOf(getClient);
    this.clients.splice(index, 1);
  };

};

var data = new Data();
exports.data = data;

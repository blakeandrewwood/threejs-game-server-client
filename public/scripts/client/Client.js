CUBES.Client = function(data) {

  this.info = {
    id: data.info.id,
    name: data.info.name
  };

  this.location = {
    position: data.location.position,
    rotation: data.location.rotation
  };

  this.stats = {
    health: data.stats.health,
    mana: data.stats.mana,
    stamina: data.stats.stamina
  };

  // ** Positioning
  this.geometry = new THREE.Object3D();
  this.geometry.position.set(mapSize/2, 0, mapSize/2);
  this.angle = 0;
  this.speed = 90;
  var geometry = new THREE.BoxGeometry( 5, 5, 5);
  var material = new THREE.MeshBasicMaterial( {color: 0x3bff6f, wireframe: true} );
  material.shading = THREE.FlatShading;
  this.mesh = new THREE.Mesh( geometry, material );
  this.mesh.position.copy(this.geometry.position);
  // ** Server Data
  this.serverData = data;
};

CUBES.Client.prototype.setServerData = function() {
  this.serverData.location.position = this.geometry.position;
  this.serverData.location.rotation = this.geometry.rotation;
};

CUBES.Client.prototype.updateServerData = function(data) {
  this.geometry.position.set(
    data.location.position.x,
    data.location.position.y,
    data.location.position.z
  );
  this.geometry.rotation.set(
    data.location.rotation._x,
    data.location.rotation._y,
    data.location.rotation._z
  );
  this.mesh.position.copy(this.geometry.position);
  this.mesh.position.y = this.mesh.position.y + 2.5;
  this.mesh.rotation.copy(this.geometry.rotation);
  this.setServerData();
};

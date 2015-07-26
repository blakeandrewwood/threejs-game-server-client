CUBES.Bullet = function(data) {

  this.location = {
    position: data.location.position,
    rotation: data.location.rotation
  };

  // ** Positioning
  this.geometry = new THREE.Object3D();
  this.geometry.position.set(
    this.location.position.x,
    this.location.position.y,
    this.location.position.z
  );
  this.geometry.rotation.set(
    this.location.rotation.x,
    this.location.rotation.y,
    this.location.rotation.z
  );
  
  this.angle = 0;
  this.speed = 90;
  var geometry = new THREE.BoxGeometry( 2, 2, 2);
  var material = new THREE.MeshBasicMaterial( {color: 0xff0000, wireframe: true} );
  this.mesh = new THREE.Mesh( geometry, material );
  this.mesh.position.copy(this.geometry.position);

  // ** Server Data
  //this.serverData = data;

};

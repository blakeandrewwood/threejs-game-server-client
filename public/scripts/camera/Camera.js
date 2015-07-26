CUBES.Camera = function() {

  this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, mapSize);
  this.camera.position.set(mapSize / 2, 1800, mapSize / 2);
  this.camera.rotation.set(0, -100 * Math.PI / 180, 0);
  this.lookAt = new THREE.Vector3();
  this.theta = 0;
  this.angle = 0;

  this.get = function() {

    return this.camera;

  };

  function getTheta(angle) {
    return angle * Math.PI / 180;
  }

  this.angleSetToClient = function(client) {

    var dtheta = (client.angle - this.angle).toFixed(0);

    if(dtheta > 180) {
      dtheta -= 360;
    }

    if(dtheta > Math.PI) {
      this.angle += 2;
    }
    else if (dtheta < -Math.PI) {
      this.angle -= 2;
    }

    this.angle += dtheta * 0.1;

  }

  this.setRotation = function(client) {

    this.theta = getTheta(this.angle);
    var x1 = this.camera.position.x;
    var z1 = this.camera.position.z;
    var x2 = client.geometry.position.x;
    var z2 = client.geometry.position.z;
    var nx = Math.cos(this.theta) * (x1 - x2) - Math.sin(this.theta) * (z1 - z2) + x2;
    var nz = Math.sin(-this.theta) * (x1 - x2) - Math.cos(this.theta) * (z1 - z2) + z2;
    this.camera.position.x = nx;
    this.camera.position.z = nz;

    this.angleSetToClient(client);

  }

  this.setPosition = function(client) {

    this.camera.position.set(
      client.geometry.position.x,
      client.geometry.position.y + 20,
      client.geometry.position.z + 50
    );

  };

  this.setLookAt = function(client) {

    this.lookAt.copy(client.geometry.position);
    this.lookAt.setY(this.lookAt.y + 10);
    this.camera.lookAt(this.lookAt);

  };

  this.update = function(client) {

    this.setPosition(client);
    this.setRotation(client);
    this.setLookAt(client);

  };

}

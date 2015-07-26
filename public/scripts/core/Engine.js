CUBES.Engine = function() {

  var stats = new CUBES.Stats();
  var socket = new CUBES.Socket();
  var input = new CUBES.Input();

  // ** Main
  var scene = new THREE.Scene();
  var camera = new CUBES.Camera();
  var world = new CUBES.World(scene);
  var lights = new CUBES.Lights(scene);

  // ** Helpers
  var clock = new THREE.Clock();
  var loader = new THREE.JSONLoader();

  var clientReady = false;
  var delta = 0;

  var renderer = new THREE.WebGLRenderer({
    antialias: true
  });

  var init = function() {
    renderer.setClearColor( 0xefd1b5 );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    stats.start();
  };

  init();

  // ** Client Join
  this.join = function(username) {
    socket.join(username, function(data) {
      // ** Attach input to player
      input.attach(data);
      scene.add(data.mesh);
      clientReady = true;
    });
  };

  // Main Game Loop

  var clientRender = function() {
    // ** Input
    input.update(delta);
    // ** Network
    socket.update(camera, world, scene);
  };

  this.render = function() {
    delta = clock.getDelta();
    stats.update(delta, socket);
    if(clientReady) {
      clientRender();
    }
    renderer.render(scene, camera.get());
  };

}

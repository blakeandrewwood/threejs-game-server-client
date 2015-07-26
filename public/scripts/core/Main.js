var engine = new CUBES.Engine();

window.addEventListener('resize', onWindowResize, false);

render();

function onWindowResize() {

  engine.camera.get().aspect = window.innerWidth / window.innerHeight;
  engine.camera.get().updateProjectionMatrix();
  engine.renderer.setSize(window.innerWidth, window.innerHeight);

};

// ** Main Loop
function render() {

  requestAnimationFrame(render);
  engine.render();

};

// ** Join Server
function join(username) {

  engine.join(username);

};

$('#join').submit(function(event) {

  event.preventDefault();
  $(this).fadeOut();
  join($('#name').val());

});

// ** Disable right click menu
$(this).bind("contextmenu", function(e) {
  e.preventDefault();
});

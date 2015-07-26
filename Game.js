var previousTick = Date.now();
var actualTicks = 0;
var tickLengthMs = 1000 / 60;
var currentTime = 0;
var fps = 0;

console.log('STARTING SERVER');

loop();

// ** Main Server Loop
function loop() {
  if (Date.now() - previousTick < tickLengthMs - 16) {
    setTimeout(loop);
  } else {
    setImmediate(loop);
  }
  tick();
}

function getFPS(delta) {
  fps++;
  currentTime += delta;
  if (currentTime > 1) {
    //console.log(fps + ' Users: ' + User.users.length + ' Bullets: ' + Bullet.bullets.length);
    currentTime = 0;
    fps = 0;
  }
}


function tick() {
  var now = Date.now();
  actualTicks++;
  if (previousTick + tickLengthMs <= now) {
    var delta = (now - previousTick) / 1000;
    previousTick = now;
    update(delta);
    actualTicks = 0;
    getFPS(delta);
  }
}


function update(delta) {

}

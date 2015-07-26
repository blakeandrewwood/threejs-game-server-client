CUBES.Input = function() {

  this.keyboard = new CUBES.KeyboardState();
  this.client = null;

  this.attach = function(client) {
    this.client = client;
  };

  this.movement = function(delta) {

    // ** Keyboard
    if (this.keyboard.pressed("w")) {
      this.client.move(delta, 'forward');
    }
    else if (this.keyboard.pressed("s")) {
      this.client.move(delta, 'backward');
    }
    if (this.keyboard.pressed("a")) {
      this.client.move(delta, 'left');
    }
    else if (this.keyboard.pressed("d")) {
      this.client.move(delta, 'right');
    }

    // ** Mouse
    // TODO: Rewrite input class
    /*
    if (this.keyboard.pressed("mouseLeft")) {
      console.log('left');
      this.client.attack('left');
    }
    else if (this.keyboard.pressed("mouseRight")) {
      this.client.attack('right');
    }
    else if (this.keyboard.pressed("mouseMiddle")) {
      console.log('middle click');
    }
    */

  };

  this.update = function(delta) {
    this.movement(delta);
  };

};

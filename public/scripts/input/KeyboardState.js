CUBES.KeyboardState = function() {

  this.keyCodes = {};
  this.modifiers = {};

  var self = this;

  this._onKeyDown = function(event) {
    self._onKeyChange(event, true);
  };
  this._onKeyUp = function(event) {
    self._onKeyChange(event, false);
  };
  document.addEventListener("keydown", this._onKeyDown, false);
  document.addEventListener("keyup", this._onKeyUp, false);
};

CUBES.KeyboardState.MODIFIERS = ['shift', 'ctrl', 'alt', 'meta'];
CUBES.KeyboardState.ALIAS = {
  'left': 37,
  'up': 38,
  'right': 39,
  'down': 40,
  'space': 32,
  'pageup': 33,
  'pagedown': 34,
  'tab': 9,
};

CUBES.KeyboardState.prototype._onKeyChange = function(event, pressed) {
    if(event.buttons) {
    var keyCode = event.buttons;
    } else {
    var keyCode = event.keyCode;
    }
  this.keyCodes[keyCode] = pressed;
  this.modifiers['shift'] = event.shiftKey;
  this.modifiers['ctrl'] = event.ctrlKey;
  this.modifiers['alt'] = event.altKey;
  this.modifiers['meta'] = event.metaKey;
};

CUBES.KeyboardState.prototype.pressed = function(keyDesc) {
  var keys = keyDesc.split("+");
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var pressed;
    if (CUBES.KeyboardState.MODIFIERS.indexOf(key) !== -1) {
      pressed = this.modifiers[key];
    }
    else if (Object.keys(CUBES.KeyboardState.ALIAS).indexOf(key) != -1) {
      pressed = this.keyCodes[CUBES.KeyboardState.ALIAS[key]];
    } else {
      pressed = this.keyCodes[key.toUpperCase().charCodeAt(0)]
    }
    if (!pressed) return false;
  };
  return true;
};

exports.Client = function(){

  this.info = {
    id: null,
    name: null
  };

  this.location = {
    position: {x: 0, y: 0, z: 0},
    rotation: {x: 0, y: 0, z: 0}
  };

  this.stats = {
    health: 1000,
    mana: 500,
    stamina: 100
  };

};

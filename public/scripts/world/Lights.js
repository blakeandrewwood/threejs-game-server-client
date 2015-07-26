CUBES.Lights = function(scene) {

    //var guiLight = new THREE.AmbientLight( 0xFFFFFF );
    //guiScene.add( guiLight );

    var light = new THREE.HemisphereLight( 0xFFFFFF, new THREE.Color(0.8, 0.8, 0.8), 0.8 );

    light.position.set( 1200, 10, 1200 );

    scene.add( light );

    // ** Light Direction
    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var material = new THREE.MeshBasicMaterial( {color: 0xFFFFFF} );
    var lightTarget = new THREE.Mesh( geometry, material );
    lightTarget.position.set(0, -100, 0);
    scene.add( lightTarget );

    var shadowTarget = new THREE.Mesh( geometry, material );
    shadowTarget.position.set(mapSize/2, -100, mapSize/2);
    scene.add( shadowTarget );

    // ** Main Light
    sun = new THREE.DirectionalLight(new THREE.Color(0.9, 0.9, 0.9), 0.4);
    sun.position.set(mapSize/2, mapSize / 2, mapSize/2);
    sun.target = lightTarget;
    sun.castShadow = false;
    scene.add( sun );

     // ** shadow Light
    sun1 = new THREE.DirectionalLight(new THREE.Color(1, 1, 1), 1);
    sun1.position.set(mapSize/2, 2000, mapSize/2);
    sun1.target = shadowTarget;
    sun1.shadowMapWidth = 1024 * 5;
    sun1.shadowMapHeight = 1024 * 5;
    sun1.shadowCameraLeft = -mapSize / 2;
    sun1.shadowCameraRight = mapSize / 2;
    sun1.shadowCameraTop = mapSize / 2;
    sun1.shadowCameraBottom = -mapSize / 2;
    sun1.shadowDarkness	= 0.5;
    sun1.castShadow = true;
    sun1.onlyShadow = true;
    //sun1.shadowCameraVisible = true;
    scene.add( sun1 );

}

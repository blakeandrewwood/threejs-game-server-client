CUBES.World = function(scene) {


    var img = new Image();
    var size = mapFileSize * mapFileSize;
    var height = new Float32Array( size );
    var planeGeo = new THREE.PlaneBufferGeometry( mapSize, mapSize, mapFileSize - 1, mapFileSize - 1 );

    planeGeo.applyMatrix(
        new THREE.Matrix4().makeRotationX( -Math.PI / 2 )
    );

    planeGeo.applyMatrix(
        new THREE.Matrix4().makeTranslation( mapSize / 2, 0, mapSize / 2 )
    );

    var vertices = planeGeo.attributes.position.array;
    this.plane = null;


    img.onload = function () {

        var data = getHeightData(img);
        for(var i = 0, j = 0; i < vertices.length; i++, j +=3) {
            height[i] = data[i] * scale;
            vertices[j + 1] = height[i];
        }

        planeGeo.computeFaceNormals();
        var texture = THREE.ImageUtils.loadTexture('images/heightmap2.png');
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set( 1, 1 );
        texture.magFilter = THREE.NearestFilter;
        //texture.minFilter = THREE.LinearMipMapLinearFilter;
        var material = new THREE.MeshLambertMaterial({map: texture, wireframe: false});
        //material.color = new THREE.Color("rgb(90,180,50)");
        //material.emissive = new THREE.Color("rgb(40,0,12)");
        material.shading = THREE.FlatShading;
        material.needsUpdate = true;
        planeGeo.verticesNeedUpdate = true;
        planeGeo.computeFaceNormals();
        planeGeo.computeVertexNormals();
        this.plane = new THREE.Mesh( planeGeo, material );
        //this.plane.receiveShadow = true;
        scene.add(this.plane);
    };

    img.src = "images/heightmap2.png";


    function getHeightData(img) {
        var canvas = document.createElement( 'canvas' );
        canvas.width = 256;
        canvas.height = 256;
        var context = canvas.getContext( '2d' );
        var size = 256 * 256, data = new Float32Array( size );
        context.drawImage(img, 0, 0);
        for ( var i = 0; i < size; i ++ ) {
            data[i] = 0;
        }
        var imgd = context.getImageData(0, 0, 256, 256);
        var pix = imgd.data;
        for (var i = 0, j = 0; i < pix.length; i += (4), j++) {
            var all = pix[i];
            data[j] = all;
        }
        return data;
    }


    var createSkybox = function() {

        var imagePrefix = "images/sky";
        var directions  = ["", "", "-top", "", "", ""];
        var imageSuffix = ".png";
        var skyGeometry = new THREE.BoxGeometry( mapSize, mapSize, mapSize );
        var materialArray = [];
        for (var i = 0; i < 6; i++)
            materialArray.push( new THREE.MeshBasicMaterial({
                map: THREE.ImageUtils.loadTexture( imagePrefix + directions[i] + imageSuffix ),
                side: THREE.BackSide
            }));
        var skyMaterial = new THREE.MeshFaceMaterial( materialArray );
        skyMaterial.shading = THREE.NoShading;
        var skyBox = new THREE.Mesh( skyGeometry, skyMaterial );
        skyBox.position.set(mapSize / 2, mapSize / 2.5, mapSize / 2);
        scene.add( skyBox );

        scene.fog = new THREE.FogExp2( 0x53c4ff, 0.00002 );

        var texture = THREE.ImageUtils.loadTexture('images/moon.png');
        var geometry = new THREE.SphereGeometry( 3500, 24, 24 );
        var material = new THREE.MeshBasicMaterial( {map: texture, transparent: true, opacity: 0.06 } );
        var sphere = new THREE.Mesh( geometry, material );
        sphere.position.set(mapSize - 1500, 2200, mapSize - 1500);
        sphere.rotation.y = 20 * Math.PI / 180;
        scene.add( sphere );

        var geometry = new THREE.SphereGeometry( 500, 16, 16 );
        var material = new THREE.MeshBasicMaterial( {color: 0x53c4ff, transparent: true, opacity: 0.06 } );
        var sphere2 = new THREE.Mesh( geometry, material );
        sphere2.position.set(mapSize, 4200, mapSize - 6000);
        sphere2.rotation.y = 20 * Math.PI / 180;
        scene.add( sphere2 );

    }

    var createWater = function() {

    }

    this.getVert = function(x, z) {
        var i = (z*3)*256 + (x*3);
        var position = new THREE.Vector3(vertices[i + 0],
                                         vertices[i + 1],
                                         vertices[i + 2]);
        return position;
    }

    createSkybox();

}

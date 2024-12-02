var camera, scene, renderer, controls;
var geometry, material, cube1, cube2, cube3, plane, sphere;

var clock = new THREE.Clock();
var keyboard = new THREEx.KeyboardState();

init();
render();


function init() {
    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 1000 );
    camera.position.set(0, 0, 5);

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    scene = new THREE.Scene();

    addObjects();

    controls = new THREE.OrbitControls( camera, renderer.domElement );

}

function render() {
    requestAnimationFrame( render );

    cube3.rotation.y += 0.02;

    sphere.rotation.y +=0.0003;

    renderer.render( scene, camera );
    camera.lookAt(scene.position);

    update();
}

function addObjects(){

    var geometryPlane = new THREE.PlaneGeometry( 10, 10, 4, 4 );
    var materialPlane = new THREE.MeshBasicMaterial( {color: 0x747570, side: THREE.DoubleSide} );
    plane = new THREE.Mesh( geometryPlane, materialPlane );
    plane.position.set(0, -0.5, 0);
    plane.rotation.x = Math.PI / 2;
    scene.add( plane );

    var geometryCube = new THREE.BoxGeometry( 1, 1, 1 );
    var cubeTexture = new THREE.ImageUtils.loadTexture( 'texture/box.jpg' );
    var materialCube = new THREE.MeshBasicMaterial( {map: cubeTexture} );
    cube1 = new THREE.Mesh( geometryCube, materialCube );
    cube1.position.set(0, 0, 0);
    scene.add( cube1 );

    var geometryOpacityBox = new THREE.BoxGeometry( 1, 1, 1 );
    var materialOpacityBox = new THREE.MeshBasicMaterial( {color: 0xEAF913, transparent: true, opacity: 0.5 } );
    cube2 = new THREE.Mesh( geometryOpacityBox, materialOpacityBox );
    cube2.position.set(1.5, 0, 0);
    scene.add( cube2 );

    var geometryWiredBox = new THREE.BoxGeometry( 1, 1, 1 );
    var materialWiredBox = new THREE.MeshBasicMaterial( {color: 'rgb(255,0,0)', wireframe: true, transparent: true} );
    cube3 = new THREE.Mesh( geometryWiredBox, materialWiredBox );
    cube3.position.set(-1.5, 0, 0);
    scene.add( cube3 );

    var geometrySphere = new THREE.SphereGeometry( 100, 100, 100 );
    var SphereTexture = new THREE.ImageUtils.loadTexture( 'texture/sky.jpg' );
    var materialSphere = new THREE.MeshBasicMaterial( {map: SphereTexture, transparent: true, side: THREE.DoubleSide} );
    sphere = new THREE.Mesh( geometrySphere, materialSphere );
    sphere.position.set(0, 0, 0);
    scene.add( sphere );

}


function update(){

    var delta = clock.getDelta(); // seconds.
    var moveDistance = 2 * delta;
    var rotateAngle = Math.PI / 2 * delta;


    // move forwards/backwards/left/right
    if ( keyboard.pressed("W") )
        cube1.translateZ( -moveDistance );
    if ( keyboard.pressed("S") )
        cube1.translateZ(  moveDistance );
    if ( keyboard.pressed("Q") )
        cube1.translateX( -moveDistance );
    if ( keyboard.pressed("E") )
        cube1.translateX(  moveDistance );


    // global coordinates
    if ( keyboard.pressed("left") )
        cube1.position.x -= moveDistance;
    if ( keyboard.pressed("right") )
        cube1.position.x += moveDistance;
    if ( keyboard.pressed("up") )
        cube1.position.z -= moveDistance;
    if ( keyboard.pressed("down") )
        cube1.position.z += moveDistance;

    controls.update();

}


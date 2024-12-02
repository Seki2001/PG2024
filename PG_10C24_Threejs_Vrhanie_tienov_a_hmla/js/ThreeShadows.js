var camera, scene, renderer, controls;
var geometry, material, cube, cylinder, sphere;

var clock = new THREE.Clock();
var keyboard = new THREEx.KeyboardState();

var curve = new THREE.CatmullRomCurve3( [
	new THREE.Vector3( -5,1,5 ),
	new THREE.Vector3( 5,1,5 ),
	new THREE.Vector3( 5,1,-5 ),
	new THREE.Vector3( -5,1,-5 ),
	], true );
var points = curve.getPoints( 50 );
var geometry = new THREE.BufferGeometry().setFromPoints( points );
var material = new THREE.LineBasicMaterial( { color : 0xff0000 });
var curveObject = new THREE.Line( geometry, material );
var PosIndex = 0;


init();
render();

function init() {

    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 1000 );
    camera.position.set(0, 0, 5);

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize( window.innerWidth, window.innerHeight );

	// doplnit nastavenie typu tienovacej mapy


    document.body.appendChild( renderer.domElement );

    scene = new THREE.Scene();

    addObjects();
    addLights();

    controls = new THREE.OrbitControls( camera, renderer.domElement );

}

function render() {

    requestAnimationFrame( render );

    renderer.render( scene, camera );
    camera.lookAt(scene.position);
    update();

    //Pridanie fragmentu pre animovanie krivky
	scene.add(curveObject);
	
	PosIndex++;
	
	if (PosIndex > 10000) { PosIndex = 0;}
	var camPos = curve.getPoint(PosIndex / 1000);
	var camRot = curve.getTangent(PosIndex / 1000);
	
	cube.position.x = camPos.x;
	cube.position.y = camPos.y;
	cube.position.z = camPos.z;
	cube.rotation.x = camRot.x;
	cube.rotation.y = camRot.y;
	cube.rotation.z = camRot.z;
	// cube.lookAt(curve.getPoint((PosIndex+1) / 1000));


}

function addObjects() {

	var floorTexture = new THREE.ImageUtils.loadTexture('texture/floor.jpg');
	floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
	floorTexture.repeat.set(10, 10);
	var geometryPlane = new THREE.PlaneGeometry(20, 20, 4, 4);
	var materialPlane = new THREE.MeshStandardMaterial({
		map: floorTexture,
		side: THREE.DoubleSide,
		roughness: 0.12,
		metalness: 0.65
	});
	plane = new THREE.Mesh(geometryPlane, materialPlane);
	plane.position.set(0, -0.5, 0);
	plane.rotation.x = Math.PI / 2;

	// nastavenie prijimatela tiena


	scene.add(plane);


	var geometrySphere = new THREE.SphereGeometry(100, 100, 100);
	var sphereTexture = new THREE.ImageUtils.loadTexture('texture/room.jpg');
	var materialSphere = new THREE.MeshBasicMaterial({map: sphereTexture, transparent: true, side: THREE.DoubleSide});
	sphere = new THREE.Mesh(geometrySphere, materialSphere);
	sphere.position.set(0, 0, 0);

	scene.add(sphere);


	var geometryCube = new THREE.BoxGeometry(1, 1, 1);
	var cubeTexture = new THREE.ImageUtils.loadTexture('texture/lirkis.jpg');
	var materialCube = new THREE.MeshBasicMaterial({
		map: cubeTexture,
		side: THREE.DoubleSide
	});
	cube = new THREE.Mesh(geometryCube, materialCube);
	cube.position.set(0, 0, 0);

	scene.add(cube);

	//Pridanie fragmentu pre objekt kociek



	//Pridanie fragmentu pre nacitanie objektov


}

function addLights(){

    var ambientLight = new THREE.AmbientLight(0x777777);
    scene.add(ambientLight);

    var spotlight1 = new THREE.SpotLight('rgb(255,255,255)');
    spotlight1.angle = Math.PI/3;
    spotlight1.position.set(0, 3, 8);
	spotlight1.intensity = 2;
	spotlight1.penumbra = 1;

	// nastavenie, ze toto svetlo bude zdrojom pre vrhanie tiena



    scene.add(spotlight1);


    var spotLightHelper = new THREE.SpotLightHelper( spotlight1 );
    scene.add( spotLightHelper );
}

function update()
{
    controls.update();
}

function loadOBJectsPhong(x,y,z, path, scalex, scaley, scalez, texturePath, colorMaterial){
	var loader = new THREE.OBJLoader();
	var textureSurface = new THREE.TextureLoader().load(texturePath);
	var material = new THREE.MeshPhongMaterial({
				color: colorMaterial,
				map: textureSurface
				});
	loader.load( path, function ( object ) {
		object.traverse( function ( node ) {
		object.position.set(x,y,z);
		object.material = material;
		object.scale.set(scalex,scaley,scalez);
		object.rotation.y = Math.PI / 2;
		if ( node.isMesh ) node.material = material;});

		//Vložte fragment pre priradenie možnosti vrhania tieňov pre potomkov

		scene.add( object );
	});
}



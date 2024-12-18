// set the scene size
var WIDTH = 700, HEIGHT = 700;
// set some camera attributes
var VIEW_ANGLE = 45, ASPECT = WIDTH / HEIGHT, NEAR = 1, FAR = 1000;
// get the DOM element to attach to
var $container = $('#container');
// create a WebGL renderer, camera, and a scene
var renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
var scene = new THREE.Scene();
var clock = new THREE.Clock();
var camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
var canvas = renderer.domElement;

// Create a listener for the canvas element to track the moving of the user's mouse.
canvas.addEventListener('mousemove', onMouseMove);

// the camera starts at 0,0,0 so pull it back
camera.position.z = 200;
// add the camera to the scene
scene.add(camera);

// start the renderer
renderer.setSize(WIDTH, HEIGHT);
// attach the render-supplied DOM element
$container.append(renderer.domElement);

// Create a point light
var areaLight = new THREE.RectAreaLight(0xffffff, 10);
var spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(0, 80, 0);
spotLight.castShadow = true;
scene.add(areaLight, spotLight);

// Define the qualities of the shadows
spotLight.shadow.mapSize.width = 512;
spotLight.shadow.mapSize.height = 512;
spotLight.shadow.camera.near = 0.5;
spotLight.shadow.camera.far = 500;
spotLight.shadow.focus = 1;

// create materials for the atoms and bonds
var cMaterial = new THREE.MeshPhongMaterial({ color: 0xab0000, emissive: 0xaa2222, shininess: 8, specular: 0x0fffff });
var hMaterial = new THREE.MeshPhongMaterial({ color: 0x2080aa, emissive: 0x000aa, shininess: 8, specular: 0x0fffff });
var bMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff, emissive: 0xaaaaaa });
var pMaterial = new THREE.MeshPhongMaterial({ color: 0x80f080, emissive: 0x001000, side: THREE.DoubleSide });

// set up the sphere vars
var cRadius = 20, cSegments = 35, cRings = 35;
var hRadius = 10, hSegments = 35, hRings = 35;

// create meshes for the atoms and bonds
var carbon = new THREE.Mesh(new THREE.SphereGeometry(cRadius, cSegments, cRings), cMaterial);
var hydrogen1 = new THREE.Mesh(new THREE.SphereGeometry(hRadius, hSegments, hRings), hMaterial);
var hydrogen2 = new THREE.Mesh(new THREE.SphereGeometry(hRadius, hSegments, hRings), hMaterial);
var hydrogen3 = new THREE.Mesh(new THREE.SphereGeometry(hRadius, hSegments, hRings), hMaterial);
var hydrogen4 = new THREE.Mesh(new THREE.SphereGeometry(hRadius, hSegments, hRings), hMaterial);
var bond1 = new THREE.Mesh(new THREE.CylinderGeometry(3, 3, 60, 35), bMaterial);
var bond2 = new THREE.Mesh(new THREE.CylinderGeometry(3, 3, 60, 35), bMaterial);
var bond3 = new THREE.Mesh(new THREE.CylinderGeometry(3, 3, 60, 35), bMaterial);
var bond4 = new THREE.Mesh(new THREE.CylinderGeometry(3, 3, 60, 35), bMaterial);
var plane = new THREE.Mesh(new THREE.PlaneGeometry(500, 500, 500), pMaterial);

// Group atoms and bonds together
var CH4 = new THREE.Group();
CH4.add(carbon, hydrogen1, hydrogen2, hydrogen3, hydrogen4, bond1, bond2, bond3, bond4);
scene.add(CH4, plane);

// Set positions and rotations
hydrogen1.position.y = 50;
hydrogen2.position.y = -25;
hydrogen2.position.z = 50;
hydrogen3.position.x = -50;
hydrogen3.position.y = -25;
hydrogen3.position.z = -10;
hydrogen4.position.x = 50;
hydrogen4.position.y = -25;
hydrogen4.position.z = -10;
bond1.position.y = 20;
bond2.position.y = -10;
bond2.position.z = 15;
bond2.rotation.x = -20;
bond3.position.x = -15;
bond3.position.y = -10;
bond3.position.z = -6;
bond3.rotation.y = -0.2;
bond3.rotation.z = -20;
bond4.position.x = 15;
bond4.position.y = -10;
bond4.position.z = -6;
bond4.rotation.y = 0.2;
bond4.rotation.z = 20;
plane.position.y = -55;
plane.rotation.x = 300;

// Mouse move listener to rotate the molecule
function onMouseMove(event) {
    CH4.rotation.x += event.movementY * 0.002;
    CH4.rotation.y += event.movementX * 0.002;
}

// Render function
function animate() {
    requestAnimationFrame(animate);
    render();
}

function render() {
    renderer.render(scene, camera);
}

animate();

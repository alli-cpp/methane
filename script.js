// Create the scene
const scene = new THREE.Scene();

// Create the camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5; // Position the camera along the Z-axis

// Create the renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight); // Set the canvas size
document.body.appendChild(renderer.domElement); // Add the renderer's canvas to the HTML body

// Create a green plane to reflect light and show shadows
const planeGeometry = new THREE.PlaneGeometry(20, 20);
const planeMaterial = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2; // Rotate the plane to be flat
plane.position.y = -2; // Position the plane below the molecule
plane.receiveShadow = true; // The plane will receive shadows
scene.add(plane);

// Create a red sphere (Carbon Atom)
const carbonGeometry = new THREE.SphereGeometry(0.5, 32, 32);
const carbonMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 }); // Red for carbon
const carbonAtom = new THREE.Mesh(carbonGeometry, carbonMaterial);
scene.add(carbonAtom);

// Create blue spheres (Hydrogen Atoms)
const hydrogenGeometry = new THREE.SphereGeometry(0.3, 32, 32);
const hydrogenMaterial = new THREE.MeshLambertMaterial({ color: 0x0000ff }); // Blue for hydrogen

const hydrogenAtoms = [];
for (let i = 0; i < 4; i++) {
    const hydrogenAtom = new THREE.Mesh(hydrogenGeometry, hydrogenMaterial);
    hydrogenAtoms.push(hydrogenAtom);
    scene.add(hydrogenAtom);
}

// Set positions for hydrogen atoms
hydrogenAtoms[0].position.set(1, 0, 1);  // Position 1
hydrogenAtoms[1].position.set(-1, 0, 1); // Position 2
hydrogenAtoms[2].position.set(1, 0, -1); // Position 3
hydrogenAtoms[3].position.set(-1, 0, -1); // Position 4

// Create cylinders (bonds between atoms)
const bondGeometry = new THREE.CylinderGeometry(0.05, 0.05, 2, 32);
const bondMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff, emissive: 0xaaaaaa }); // White bonds with light gray emissive color

const bonds = [];
for (let i = 0; i < 4; i++) {
    const bond = new THREE.Mesh(bondGeometry, bondMaterial);
    bonds.push(bond);
    scene.add(bond);
}

// Update the bond positions based on atoms
function updateBonds() {
    for (let i = 0; i < 4; i++) {
        const start = carbonAtom.position;
        const end = hydrogenAtoms[i].position;
        const direction = new THREE.Vector3().subVectors(end, start);
        const length = direction.length();
        bondGeometry.parameters.height = length;
        bond.position.copy(start).add(end).multiplyScalar(0.5); // Set bond position between atoms
        bond.lookAt(end); // Rotate bond to align with the vector
    }
}
updateBonds();

// Create lighting
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(10, 10, 10);
light.castShadow = true; // The light will cast shadows
scene.add(light);

// Add ambient light to illuminate shadows
const ambientLight = new THREE.AmbientLight(0x404040, 1);
scene.add(ambientLight);

// Enable mouse control (OrbitControls)
const controls = new THREE.OrbitControls(camera, renderer.domElement);

// Create the render loop
function animate() {
    requestAnimationFrame(animate);

    // Update the bond positions in case the molecule moves
    updateBonds();

    // Rotate the carbon atom for animation
    carbonAtom.rotation.y += 0.01;
    hydrogenAtoms.forEach(atom => atom.rotation.y += 0.01);

    controls.update(); // Update OrbitControls
    renderer.render(scene, camera); // Render the scene from the camera's perspective
}

animate(); // Start the animation loop

// Adjust for window resizing
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

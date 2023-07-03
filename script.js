import {OrbitControls} from "https://cdn.skypack.dev/three@0.133.1/examples/jsm/controls/OrbitControls";
let orbit;

// Create a scene
var scene = new THREE.Scene();

// Create a renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('particles-container').appendChild(renderer.domElement);

// Create a camera
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 10;

// Define the sample images for each side of the cube (base64-encoded)
var imageUrls = [
  'https://cdn.icon-icons.com/icons2/2235/PNG/512/android_os_logo_icon_134673.png',
  'https://cdn.icon-icons.com/icons2/2235/PNG/512/android_os_logo_icon_134673.png',
  'https://cdn.icon-icons.com/icons2/2235/PNG/512/android_os_logo_icon_134673.png',
  'https://cdn.icon-icons.com/icons2/2235/PNG/512/android_os_logo_icon_134673.png',
  'https://cdn.icon-icons.com/icons2/2235/PNG/512/android_os_logo_icon_134673.png',
  'https://cdn.icon-icons.com/icons2/2235/PNG/512/android_os_logo_icon_134673.png'
];

// Create a texture loader
var textureLoader = new THREE.TextureLoader();
orbit = new OrbitControls(camera, renderer.domElement);
orbit.autoRotate = true;
orbit.autoRotateSpeed = 0.1;
// Create an array to store the materials for each side of the cube
var materials = [];

// Load sample images and create materials for each side
imageUrls.forEach(function(url) {
  var texture = textureLoader.load(url);
  var material = new THREE.MeshBasicMaterial({ map: texture });
  
  materials.push(material);
});


// Create a function to generate cubes
function createCube() {
  var geometry = new THREE.BoxGeometry(2, 2, 2);
  var cube = new THREE.Mesh(geometry, materials);
  // cube.userData.interactive = true;
  
   // Set random positions for each cube with space in between
   var spaceFactor = 1; // Adjust this value to increase or decrease the space between cubes
 
  // Set random positions for each cube
  cube.position.x = (Math.random() * 14 - 5) * spaceFactor; // Random value between -5 and 5 multiplied by the space factor
  cube.position.y = (Math.random() * 14 - 5) * spaceFactor;
  cube.position.z = (Math.random() * 14 - 5) * spaceFactor;

  

  scene.add(cube);

  return cube;
}

// Create an array to store the cubes
var cubes = [];

// Generate multiple cubes
for (var i = 0; i < 10; i++) {
  var cube = createCube();
  cubes.push(cube);
}

function animate() {
  requestAnimationFrame(animate);

  // Rotate each cube
  cubes.forEach(function(cube) {
  
    orbit.update();
  });

  // Render the scene
  renderer.render(scene, camera);
}

animate();

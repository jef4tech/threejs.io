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
  'https://i0.wp.com/www.socialnews.xyz/wp-content/uploads/2022/04/22/Actress-Moksha-Glam-Stills-from-Lucky-Lakshman-Movie-Opening-.jpg?w=799&quality=80&zoom=1&ssl=1',
  'https://i0.wp.com/www.socialnews.xyz/wp-content/uploads/2022/04/22/Actress-Moksha-Glam-Stills-from-Lucky-Lakshman-Movie-Opening-.jpg?w=799&quality=80&zoom=1&ssl=1',
  'https://i0.wp.com/www.socialnews.xyz/wp-content/uploads/2022/04/22/Actress-Moksha-Glam-Stills-from-Lucky-Lakshman-Movie-Opening-.jpg?w=799&quality=80&zoom=1&ssl=1',
  'https://i0.wp.com/www.socialnews.xyz/wp-content/uploads/2022/04/22/Actress-Moksha-Glam-Stills-from-Lucky-Lakshman-Movie-Opening-.jpg?w=799&quality=80&zoom=1&ssl=1',
  'https://i0.wp.com/www.socialnews.xyz/wp-content/uploads/2022/04/22/Actress-Moksha-Glam-Stills-from-Lucky-Lakshman-Movie-Opening-.jpg?w=799&quality=80&zoom=1&ssl=1',
  'https://i0.wp.com/www.socialnews.xyz/wp-content/uploads/2022/04/22/Actress-Moksha-Glam-Stills-from-Lucky-Lakshman-Movie-Opening-.jpg?w=799&quality=80&zoom=1&ssl=1'
];

// Create a texture loader
var textureLoader = new THREE.TextureLoader();

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
  
  orbit = new OrbitControls(camera, renderer.domElement);
    orbit.autoRotate = true;
    orbit.autoRotateSpeed = 0.2;
  
  // Set random positions for each cube
  cube.position.x = Math.random() * 10 - 5; // Random value between -5 and 5
  cube.position.y = Math.random() * 10 - 5;
  cube.position.z = Math.random() * 10 - 5;
  // Add a click event listener to the cube
  cube.addEventListener('click', function() {
    cube.userData.rotate = !cube.userData.rotate; // Toggle the rotation flag
    console.log('Cube clicked!');
  });

  

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
    if (cube.userData.rotate) {
      // cube.rotation.x += 0.01;
      // cube.rotation.y += 0.01;
      // cube.rotation.z += 0.01;
    }
    orbit.update();
  });

  // Render the scene
  renderer.render(scene, camera);
}

animate();

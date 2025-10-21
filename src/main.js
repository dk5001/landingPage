import * as THREE from 'three';
import { clamp } from 'three/src/math/MathUtils.js';

// renderer
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('canvas3D').appendChild(renderer.domElement);

// scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb); // light blue background

// camera
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
// scene.add(camera);  // if one camera don't bother
camera.position.set(0, 2, 5);
camera.lookAt(0, 0, 0);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
// const cube = new THREE.Mesh(geometry, material);

let frame = new THREE.Object3D();

let cube1 = new THREE.Mesh(geometry, material);
cube1.position.x = -2;
let cube2 = new THREE.Mesh(geometry, material);
let cube3 = new THREE.Mesh(geometry, material);
cube3.position.x = 2;

frame.add(cube1, cube2, cube3);
scene.add(frame);

let startX = 5;
let endX = -5;
let page = document.querySelector('.page');

function updateFromScroll() {
    const max = page.scrollHeight - page.clientHeight;
    let t = page.scrollTop / max; // 0 to 1
    const clamped = THREE.MathUtils.clamp(t, 0, 1);
    frame.position.x = THREE.MathUtils.lerp(startX, endX, clamped);
}

function animate() {
    requestAnimationFrame(animate);
    updateFromScroll();
    renderer.render(scene, camera);
}

animate();

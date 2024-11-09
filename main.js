import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.set(10,20,15)
camera.lookAt(0, 0, 0);

const controls = new OrbitControls(camera,renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.08;
controls.update();

// lights configuration
const directLight = new THREE.DirectionalLight(0x6d7391, 3);
directLight.position.set(5, 15, 5).normalize();
directLight.castShadow = true;
scene.add(directLight);

const ambientLight = new THREE.AmbientLight(0x2e2cc7,0.05);
scene.add(ambientLight);

const spotLightTarget = new THREE.Object3D();
scene.add(spotLightTarget);
spotLightTarget.position.set(-5,2,-2);

const spotLight = new THREE.SpotLight(0xffffff,300);
spotLight.position.set(10,20,10);
spotLight.penumbra = 0.6;
spotLight.angle = 0.8;
spotLight.decay = 1.5;
spotLight.target = spotLightTarget;
spotLight.castShadow = true;
scene.add(spotLight);



let horizontalRotation = -Math.PI/2;

function createMaterial(type,color) {
    if (type == "lambert") {
        return new THREE.MeshLambertMaterial({color});
    } else if (type == "phong") {
        return new THREE.MeshPhongMaterial({color});
    } else {
        return new THREE.MeshStandardMaterial({ color });
    }
}


function spawnRoom() {
	const roomMaterial = createMaterial("lambert",0xffffff);
    const floorMaterial = createMaterial("lambert",0xc29957);

	const floorGeometry = new THREE.PlaneGeometry(20, 16);
	const floor = new THREE.Mesh(floorGeometry, floorMaterial);
	floor.rotation.x = horizontalRotation;
	scene.add(floor);

	const backWall = new THREE.Mesh(new THREE.BoxGeometry(20, 10, 0.1), roomMaterial);
	backWall.position.set(0, 5, -6);
	scene.add(backWall);

	const leftWall = new THREE.Mesh(new THREE.BoxGeometry(0.1, 10, 14), roomMaterial);
	leftWall.position.set(-10, 5, 1);
	scene.add(leftWall);
}

function ChairComponents(width, height, depth){
	const Text = new THREE.TextureLoader();
	const chairText = Text.load('textures/Screenshot 2024-11-07 010328.png');

	const chairGeo = new THREE.BoxGeometry(width,height,depth);
	const chairMat = new THREE.MeshBasicMaterial({map:chairText});
	const chair = new THREE.Mesh(chairGeo,chairMat);

	return chair;
}

function spawnchair(){
	const chair = ChairComponents(3,0.1,3);
	chair.position.set(8.1,1.5,0);
	scene.add(chair);

	const chairBack = ChairComponents(0.2,3,3);
	chairBack.position.set(9.5,3,0);
	scene.add(chairBack);

	const leg1 = ChairComponents(0.2,3,0.2);
	leg1.position.set(9.5,0,1.3);
	scene.add(leg1);

	const leg2 = ChairComponents(0.2,3,0.2);
	leg2.position.set(9.5,0,-1.3);
	scene.add(leg2);

	const leg3 = ChairComponents(0.2,3,0.2);
	leg3.position.set(7,0,1.3);
	scene.add(leg3);

	const leg4 = ChairComponents(0.2,3,0.2);
	leg4.position.set(7,0,-1.3);
	scene.add(leg4);

}


function cabinetComponent(width,height,depth) {
    const texture = new THREE.TextureLoader().load('textures/Screenshot 2024-11-09 142856.png' ); 
	const cabMaterial = new THREE.MeshBasicMaterial( { map:texture } );

	const cabGeo = new THREE.BoxGeometry(width,height,depth);
	const cabinet = new THREE.Mesh(cabGeo,cabMaterial);

	return cabinet;

	//
}



function spawnCabinet() {
    const cab1 = cabinetComponent(5,0.1,2);
    cab1.position.set(-6,0,-4.5);
    scene.add(cab1);

	const cab2 = cabinetComponent(5,0.1,2);
    cab2.position.set(-6,2,-4.5);
    scene.add(cab2);

	const cab3 = cabinetComponent(5,0.1,2);
    cab3.position.set(-6,4,-4.5);
    scene.add(cab3);

	const cab4 = cabinetComponent(5,0.1,2);
    cab4.position.set(-6,6,-4.5);
    scene.add(cab4);

	const cab5 = cabinetComponent(5,0.1,2);
    cab5.position.set(-6,7.5,-4.5);
    scene.add(cab5);

	

	const cabWall1 = cabinetComponent(0.1,7.8,2);
    cabWall1.position.set(-8.5,3.7,-4.5);
    scene.add(cabWall1);

	const cabWall2 = cabinetComponent(0.1,7.8,2);
    cabWall2.position.set(-3.5,3.7,-4.5);
    scene.add(cabWall2);

	const cabWall3 = cabinetComponent(3,7.8,2);
    cabWall3.position.set(-3.5,3.7,-4.5);
    scene.add(cabWall3);

}

function pictureComp(width,height,depth){
	const texture = new THREE.TextureLoader().load('textures/Screenshot 2024-11-09 142333.png' ); 
	const Pmaterial = new THREE.MeshBasicMaterial( { map:texture } );

	const paintGeo = new THREE.BoxGeometry(width,height,depth);
	const painting = new THREE.Mesh(paintGeo,Pmaterial);

	return painting;
}

function spawnPainting (){
	const paint = pictureComp(5,3,0.1);
    paint.position.set(0,5,-5.8);
    scene.add(paint);
}

function bedComponents(width,height,depth){
	const texture = new THREE.TextureLoader().load('textures/Screenshot 2024-11-07 005543.png' ); 
	const bedMaterial = new THREE.MeshBasicMaterial( { map:texture } );

	const bedGeo = new THREE.BoxGeometry(width,height,depth);
	const bed = new THREE.Mesh(bedGeo,bedMaterial);

	return bed;
}

function spawnBed(){
	const foam = bedComponents(5,2,10);
    foam.position.set(2,1,0);
    scene.add(foam);

	const pillow = bedComponents(4,4,2);
	pillow.position.set(2,1,-3);
	scene.add(pillow);


}



spawnRoom();
spawnchair();
spawnCabinet();
spawnPainting();
spawnBed();


function animate() {
	renderer.render( scene, camera );
    controls.update();
    
}
renderer.setAnimationLoop( animate );
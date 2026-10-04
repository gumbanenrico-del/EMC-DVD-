// Add scene, camera, renderer
const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
const renderer = new THREE.WebGLRenderer();

// screen
renderer.setSize(800, 800);
document.body.appendChild(renderer.domElement);

camera.position.z = 1;


// Plane Geometry
const geometry = new THREE.PlaneGeometry(0.3, 0.2);
const material = new THREE.MeshBasicMaterial();

const dvd = new THREE.Mesh(geometry, material);

// Start at origin
dvd.position.set(0, 0, 0);

scene.add(dvd);


// DVD Speed
let xSpeed = 0.0026;
let ySpeed = 0.0046;

//SPINNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN
let spinSpeed = 0;
const spinBoost = 0.35;   // added to spinSpeed on each bounce
const spinDecay = 0.96;   // how quickly the spin settles back down


// DVD color
function randomColor()
{
    dvd.material.color.setRGB(
        Math.random(),
        Math.random(),
        Math.random()
    );

    console.log("Color changed!");
}


// weirder spin
function spinBurst()
{
    spinSpeed += spinBoost;

    console.log("DVD spun!");
}


// Change color and size at the start
randomColor();


// Animate
function animate()
{
    renderer.render(scene, camera);

    dvd.position.x += xSpeed;
    dvd.position.y += ySpeed;

    // apply spin and let it decay back toward rest
    dvd.rotation.z += spinSpeed * 0.05;
    spinSpeed *= spinDecay;

    console.log(dvd.position);


    // Right side
    if (dvd.position.x > 0.85)
    {
        xSpeed = -0.0023;

        randomColor();
        spinBurst();
    }


    // Left side
    else if (dvd.position.x < -0.85)
    {
        xSpeed = 0.0023;

        randomColor();
        spinBurst();
    }


    // Top side
    else if (dvd.position.y > 0.9)
    {
        ySpeed = -0.0043;

        randomColor();
        spinBurst();
    }


    // Bottom side
    else if (dvd.position.y < -0.9)
    {
        ySpeed = 0.0043;

        randomColor();
        spinBurst();
    }
}


renderer.setAnimationLoop(animate);
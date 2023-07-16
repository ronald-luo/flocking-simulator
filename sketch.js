// query selectors
const maxVelocity = document.getElementById('max-velocity');
const maxRadius = document.getElementById('max-radius');
const alignmentSlider = document.getElementById('alignment');
const separationSlider = document.getElementById('separation');
const cohesionSlider = document.getElementById('cohesion');


const maxVelocityValue = document.getElementById('max-velocity-value');
const maxRadiusValue = document.getElementById('max-radius-value');
const alignmentValue = document.getElementById('alignment-value');
const separationValue = document.getElementById('separation-value');
const cohesionValue = document.getElementById('cohesion-value');


// page variables
let canvas = createHiPPICanvas(window.innerWidth, window.innerHeight);
let ctx = canvas.getContext("2d");
let flock = [];


// event listeners
window.addEventListener('resize', resizeCanvas, false);
maxVelocity.addEventListener('input', handleVelocity);
maxRadius.addEventListener('input', handleRadius);
alignmentSlider.addEventListener('input', handleAlignment);
separationSlider.addEventListener('input', handleSeparation);
cohesionSlider.addEventListener('input', handleCohesion);


// create 100 new boids on page load
(function setup() {
  for (let i = 0; i < 60; i++) {
    flock.push(new Boid());
  }
})();

// draw boids on inital on page load
(function draw() {
  for (let boid of flock) {
    boid.cohesion(flock);
    boid.align(flock);
    boid.separation(flock);
    boid.update();
    boid.edges();
    boid.show(ctx);
  }
})();

// animate the canvas at approx 60fps on page load
(function animate() {
  
  // request new animation
  window.requestAnimationFrame(animate);

  // clear previous drawing
  ctx.clearRect(0, 0, canvas.width, canvas.height); 

  // update new drawings
  for (let boid of flock) {
    boid.cohesion(flock);
    boid.align(flock);
    boid.separation(flock);
    boid.update();
    boid.edges();
    boid.show(ctx);
  }
})();


// page functions
// resize the canvas on window resize
function resizeCanvas() {
  const ratio = window.devicePixelRatio;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.width = window.innerWidth + 'px';
  canvas.style.height = window.innerHeight + 'px';
  canvas.getContext("2d").scale(ratio, ratio);
};

// create canvas with the device resolution.
function createHiPPICanvas(width, height) {
    const ratio = window.devicePixelRatio;
    const canvas = document.createElement("canvas");
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    canvas.getContext("2d").scale(ratio, ratio);
    document.body.appendChild(canvas)
    return canvas;
};

function handleVelocity(e) {
  const value = e.target.value;
  for (let boid of flock) {
    boid.maxVelocity = value;
  }
  maxVelocityValue.textContent = value;
};

function handleRadius(e) {
  const value = e.target.value;
  for (let boid of flock) {
    boid.maxRadius = value;
  }
  maxRadiusValue.textContent = value;
};

function handleAlignment(e) {
  const value = e.target.value;
  for (let boid of flock) {
    boid.maxAlignmentForce = value;
  }
  alignmentValue.textContent = value;
};

function handleSeparation(e) {
  const value = e.target.value;
  for (let boid of flock) {
    boid.maxSeparationForce = value;
  }
  separationValue.textContent = value;
};

function handleCohesion(e) {
  const value = e.target.value;
  for (let boid of flock) {
    boid.maxCohesionForce = value;
  }
  cohesionValue.textContent = value;
};
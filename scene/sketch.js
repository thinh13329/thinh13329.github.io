// Interactive Sene
// Huynh Hung Thinh
// Sept 22, 2026
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let x, y, w, h, speed;
let i, d;

async function setup() {
  createCanvas(800, 600);
  x = 400;
  y = 450;
  w = 30;
  h = 60;
  speed = 3;
  i = 0; 
  d = 5; 
}

function draw() {
  background(10, 10, 30);
  showCharacter();
  moveCharacter();
  drawStar();
}

function showCharacter() {
  fill("blue");
  rect(x, y, w, h);
}

function moveCharacter() {
  x < 800;
  y < 600;
  if (keyIsDown("w") || keyIsDown(UP_ARROW)) {
    y -= speed;
  }
  if (keyIsDown("s") || keyIsDown(DOWN_ARROW)) {
    y += speed;
  }
  if (keyIsDown("d") || keyIsDown(RIGHT_ARROW)) {
    x += speed;
  }
  if (keyIsDown("a") || keyIsDown(LEFT_ARROW)) {
    x -= speed;
  }
}

function drawStar() {
  while ( i < 50) {
    i = i +1;
    fill("white");
    circle(random(0, 800), random(0, 600), d);
  }
}
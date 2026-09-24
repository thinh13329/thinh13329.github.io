// Interactive Sene
// Huynh Hung Thinh
// Sept 22, 2026
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let x, y, w, h, speed;

async function setup() {
  createCanvas(800, 600);
  x = 400;
  y = 450;
  w = 30;
  h = 60;
  speed = 3;  
}

function draw() {
  background(10, 10, 30);
  showCharacter();
  moveCharacter();
}

function showCharacter() {
  fill("blue");
  rect(x, y, w, h);
}

function moveCharacter() {
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
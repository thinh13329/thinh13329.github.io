// Arrays and Object Notation
// Hung Thinh
// Oct 7, 2026
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let playerX = 300;
let playerY = 500;
let playerW = 40;
let playerH = 70;
playerSpeed = 5;

async function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(50, 140, 60);

  drawRoad();
  drawPlayer();
}

function drawRoad() {
  //road
  fill(60);
  Rect(150, 0, 300, 600);

  //road lines
  stroke(255);
  strokeWeight(4);

  for (let y = 0; y < height; y += 80) {
  line(300, y, 300, y + 40);
  }

  noStroke();

}

function drawPlayer() {
  fill(30, 150, 255);
  rect(
    playerX - playerW / 2,
    playerY - playerH / 2,
    playerW,
    playerH
  );
}
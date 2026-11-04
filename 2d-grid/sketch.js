// 2d grid assignment
// Hung Thinh
// Oct 29, 2026
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let player = {
  x: 300,
  y: 500,
  w: 40,
  h: 70,
  speed: 5
};
let cars = [];
let spawnTimmer = 0;
let gameState = "start";
let score = 0;
let roadOffSet = 0;
const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 600;
const ROAD_X = 150;
const ROAD_WIDTH = 300;
const PLAYER_MIN_X = 170;
const PLAYER_MAX_X = 430;
const ROAD_LINE_GAP = 80;
const SPAWN_INTERVAL = 60;

async function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
}

function draw() {
  background(50, 140, 60);
  drawRoad();
  if (gameState === "start") {
    drawStartScreen();
  }
  else if (gameState === "playing") {
    roadOffSet = (roadOffSet + 5 ) % 80;
    spawnCars();
    movePlayer();
    moveCars();
    removeOffscreenCars();
    checkCollision();
    drawCars();
    drawPlayer();
    drawScore();
  }
  else if (gameState === "gameover") {
    drawCars();
    drawPlayer();
    drawGameOver();
  }
}

function drawRoad() {
  //road
  fill(60);
  rect(150, 0 , 300, 600);
  //road lines
  stroke(255);
  strokeWeight(4);
  for (let y = -ROAD_LINE_GAP + roadOffSet; y < height; y += ROAD_LINE_GAP) {
    line(300, y, 300, y + 40);
  }
  noStroke();
}

function drawCar(x, y, bodyColor, lightY) {
  //draw wheels
  fill(20);
  rect(x -24, y - 25, 8, 20, 3);
  rect(x + 16, y - 25, 8, 20, 3);
  rect(x - 24, y + 10, 8, 20, 3);
  rect(x + 16, y + 10, 8, 20, 3);
  //car body
  fill(bodyColor);
  rect(x - 20, y - 35, 40, 70, 8);
  // Windows
  fill(180, 230, 255);
  rect(x - 14, y - 20, 28, 18, 5);
  rect(x - 14, y + 5, 28, 13, 4);
  // Headlights
  fill(255, 255, 120);
  if (lightY < 0) {
    //front lights
    rect(x - 15, y - 34, 8, 5, 2);
    rect(x + 7, y - 34, 8, 5, 2);
  }
  else {
    // Rear lights
    rect(x - 15, y + 29, 8, 5, 2);
    rect(x + 7, y + 29, 8, 5, 2);
  }
  
}

function drawPlayer() {
  drawCar(player.x, player.y, color(30, 150, 255), -34);
}

// Moves the player car based on keyboard input
function movePlayer() {
  if (keyIsDown(65) || keyIsDown(LEFT_ARROW)) {
    player.x -= player.speed;
  }
  if (keyIsDown(68) || keyIsDown(RIGHT_ARROW)) {
    player.x += player.speed;
  }
  if (player.x < 170) {
    player.x = 170;
  }
  if (player.x > 430) {
    player.x = 430;
  }
}

// Creates a new enemy car and checks spawn distance
function createCar() {
  let landpositions = [200, 250, 350, 400];
  let laneX = random(landpositions);
  for (let car of cars) {
    if (car.x === laneX && car.y < 130) {
      return;   //don't spawn too close
    }
  }
  let car = {
    x: laneX,
    y: -50,
    speed: random(4, 6),
    w: 40,
    h: 70
  };
  cars.push(car);
}

function drawCars() {
  for (let car of cars) {
    drawCar(car.x, car.y, color(220, 45, 45), 30);
  }
}

function moveCars() {
  for (let car of cars) {
    car.y += car.speed;
  }
}

function removeOffscreenCars() {
  cars = cars.filter(function(car) {
    if (car.y - car.h / 2 > height) {
      score++;
      return false;
    }
    return true;
  });
}

function spawnCars() {
  spawnTimmer++;
  if (spawnTimmer >= 60) {
    createCar();
    spawnTimmer = 0;
  }
}

// Checks if the player collides with an enemy car
function checkCollision() {
  for (let car of cars) {
    let playerLeft = player.x - player.w / 2;
    let playerRight = player.x + player.w / 2;
    let playerTop = player.y - player.h / 2;
    let playerBottom = player.y + player.h / 2;

    let carLeft = car.x - car.w / 2;
    let carRight = car.x + car.w / 2;
    let carTop = car.y - car.h / 2;
    let carBottom = car.y + car.h / 2;

    if (
      playerRight > carLeft &&
      playerLeft < carRight &&
      playerBottom > carTop &&
      playerTop < carBottom
    ) {
      gameState = "gameover";
    }
  }
}
  
function drawScore() {
  fill("white");
  textSize(24);
  textAlign(LEFT, TOP);
  text("score: " + score, 20, 20);
}

function drawGameOver() {
  fill("white");
  textAlign(CENTER, CENTER);
  textSize(45);
  text("GAME OVER", width / 2, height / 2 - 50);
  textSize(25);
  text("Final Score: " + score, width / 2, height / 2);
  textSize(18);
  text("Press R to restart", width / 2, height / 2 + 50);
}

function keyPressed() {
  if (gameState === "gameover" && (key === "r" || key === "R")) {
    resetGame();
  }
}

function resetGame() {
  cars = [];
  score = 0;
  spawnTimmer = 0;
  player.x = 300;
  player.y = 500;
  gameState = "playing";
}

function drawStartScreen() {
  fill("white");
  textAlign(CENTER, CENTER);
  textSize(40);  
  text("TRAFFIC DODGE", width / 2, height / 2 - 100);
  textSize(20);  
  text("Avoid the red cars!", width / 2, height / 2 - 55);
  //controls
  textSize(18);
  text("CONTROLS", width / 2, height / 2 - 5);
  text("LEFT / RIGHT ARROW", width / 2, height / 2 + 25);
  text("or A / D to move", width / 2, height / 2 + 50);
  text("Avoid cars and earn points!", width / 2, height / 2 + 85);  
  textSize(24);  
  text("Click to Start", width / 2, height / 2 + 135);
}

function mousePressed() {
  if (gameState === "start") {
    gameState = "playing";
  }
  else if (gameState === "gameover") {
    resetGame();
  }
}
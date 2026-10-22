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
let cars = [];
let spawnTimmer = 0;
let gameState = "start";
let score = 0;
let roadOffSet = 0;

async function setup() {
  createCanvas(600, 600);
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
    keyPressed();
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
  for (let y = -80 + roadOffSet; y < height; y += 80) {
    line(300, y, 300, y + 40);
  }
  noStroke();
}

function drawPlayer() {
  //wheels
  fill(20);
  rect(playerX -24, playerY - 25, 8, 20, 3);
  rect(playerX + 16, playerY - 25, 8, 20, 3);
  rect(playerX - 24, playerY + 10, 8, 20, 3);
  rect(playerX + 16, playerY + 10, 8, 20, 3);
  //car body
  fill(30, 150 , 255);
  rect(playerX - 20, playerY - 35, 40, 70, 8);
  // Windows
  fill(180, 230, 255);
  rect(playerX - 14, playerY - 20, 28, 18, 5);
  rect(playerX - 14, playerY + 5, 28, 13, 4);

  // Headlights
  fill(255, 255, 120);
  rect(playerX - 15, playerY - 34, 8, 4, 2);
  rect(playerX + 7, playerY - 34, 8, 4, 2);
}

function movePlayer() {
  if (keyIsDown("a") || keyIsDown(LEFT_ARROW)) {
    playerX -= playerSpeed;
  }
  if (keyIsDown("d") || keyIsDown(RIGHT_ARROW)) {
    playerX += playerSpeed;
  }
  if (playerX < 170) {
    playerX = 170;
  }
  if (playerX > 430) {
    playerX = 430;
  }
}

function createCar() {
  let landpositions = [200, 250, 350, 400];
  let laneX = random(landpositions);
  for (let car of cars) {
    if (car.x === laneX && car.y < 120) {
      return;   //don't spawn too close
    }
  }
  let car = {
    x: random(landpositions),
    y: -50,
    speed: random(3, 6),
    w: 40,
    h: 70
  };
  cars.push(car);
}

function drawCars() {
  fill('red');
  for (let car of cars) {
    // Wheels
    fill(20);
    rect(car.x - 24, car.y - 25, 8, 20, 3);
    rect(car.x + 16, car.y - 25, 8, 20, 3);
    rect(car.x - 24, car.y + 10, 8, 20, 3);
    rect(car.x + 16, car.y + 10, 8, 20, 3);
    // Car body
    fill(220, 45, 45);
    rect(car.x - 20, car.y - 35, 40, 70, 8);
    // Windows
    fill(255, 200, 200);
    rect(car.x - 14, car.y - 20, 28, 18, 5);
    rect(car.x - 14, car.y + 5, 28, 13, 4);
    // Rear lights
    fill(255, 240, 100);
    rect(car.x - 15, car.y + 30, 8, 4, 2);
    rect(car.x + 7, car.y + 30, 8, 4, 2);
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

function checkCollision() {
  for (let car of cars) {
    let playerLeft = playerX - playerW / 2;
    let playerRight = playerX + playerW / 2;
    let playerTop = playerY - playerH / 2;
    let playerBottom = playerY + playerH / 2;

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
  if (gameState === "gameover" && key === "r" || key === "R") {
    resetGame();
  }
}

function resetGame() {
  cars = [];
  score = 0;
  spawnTimmer = 0;
  playerX = 300;
  playerY = 500;
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
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
let gameState = "playing";
let score = 0;

async function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(50, 140, 60);
  drawRoad();
  drawPlayer();
  movePlayer();
  createCar();
  drawCars();
  moveCars();
  removeOffscreenCars();
  spawnCars();
}

function drawRoad() {
  //road
  fill(60);
  rect(150, 0 , 300, 600);

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
    rect(
      car.x - car.w / 2,
      car.y - car.h / 2,
      car.w,
      car.h
    );
  }
}

function moveCars() {
  for (let car of cars) {
    car.y += car.speed;
  }
}

function removeOffscreenCars() {
  cars = cars.filter(function(car) {
    return car.y < height + car.h;
  });
}

function spawnCars() {
  spawnTimmer++;
  
  if (spawnTimmer >= 60) {
    createCar();
    spawnTimmer = 0;
  }
}
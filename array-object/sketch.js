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

async function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(50, 140, 60);

  drawRoad();
  drawPlayer();
  createCar();
  drawCars();
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

function createCar() {
  let car = {
    x: 220,
    y: 50,
    speed: 3,
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
// Interactive Sene
// Huynh Hung Thinh
// Sept 22, 2026
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let spaceship;
let spaceshipScaleX = 0.15;
let spaceshipScaleY = 0.15;
let x, y, w, h, speed;
let bullets = [];
let bulletSpeed = 8;

async function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  spaceship = await loadImage("spaceship.pod_.1.png");
  x = windowWidth/2;
  y = windowHeight/1.5;
  w = 30;
  h = 60;
  speed = 10;
  
}

function draw() {
  background(10, 10, 30);
  showCharacter();
  moveCharacter();
  drawBullet();
  moveBullet();
  shootBullet();
}

function showCharacter() {
  image(spaceship, x, y, spaceship.Width * spaceshipScaleX, spaceship.height * spaceshipScaleY);
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

function drawBullet() {
  fill("red");
  for (let bullet of bullets) {
    rect(bullet.x, bullet.y, 5, 15);
  }
}

function moveBullet() {
  for (let bullet of bullets) {
    bullet.y -= bulletSpeed;
  }
  bullets = bullets.filter(bullet => bullet.y > -20);
}

function shootBullet() {
  if (keyIsDown("t")) {
    bullets.push({
      x: x + w / 2,
      y: y
    });
  }
}
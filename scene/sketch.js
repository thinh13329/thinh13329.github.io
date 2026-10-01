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
let enemies = [];

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
  createEnemies();
  drawEnemies();
  checkBulletEnemyCollision();
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

function createEnemies () {
  enemies.push({
    x: random(50, width - 50),
    y: 50,
    w: 40,
    h: 40
  });
}

function drawEnemies() {
  fill("red");
  for (let enemy of enemies) {
    rect(enemy.x, enemy.y, enemy.w, enemy.h);
  }
}

function checkBulletEnemyCollision() {
  for (let i = bullets.length - 1; i >= 0; i --) {
    for (let j = enemies.length - 1; j >= 0; j --) {
      if (
        bullets[i].x < enemies[j].x + enemies[j].w &&
        bullets[i].x + 5 > enemies[j].x &&
        bullets[i].y < enemies[j].y + enemies[j].h &&
        bullets[i].y + 15 > enemies[j].y
      ) {
        bullets.splice(i, 1);
        enemies.splice(j, 1);
        break;
      }
    }
  }
}
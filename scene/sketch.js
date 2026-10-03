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
let bulletSpeed = 20;
let enemies = [];
let score = 0;
let gameState = "start";
let spawnTimer = 0;
let shootState = "ready";
let shootTimer;


async function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  spaceship = await loadImage("spaceship.pod_.1.png");
  x = windowWidth/2;
  y = windowHeight/1.1;
  w = 30;
  h = 60;
  speed = 15; 
  createEnemy();
}

function draw() {
  background(10, 10, 30);
  if (gameState === "start") {
    showCharacter();
    moveCharacter();
    drawBullet();
    moveBullet();
    shootBullet();
    drawEnemies();
    checkBulletEnemyCollision();
    moveEnemies();
    spawnEnemies();
    drawScore();
  if (gameState === "gameover") {
    drawGameOver();
    }
  }
}

function showCharacter() {
  image(spaceship, x, y, spaceship.Width * spaceshipScaleX, spaceship.height * spaceshipScaleY);
}

function moveCharacter() {
  if (keyIsDown("d") || keyIsDown(RIGHT_ARROW)) {
    x += speed;
  }
  if (keyIsDown("a") || keyIsDown(LEFT_ARROW)) {
    x -= speed;
  }
}

function drawBullet() {
  fill("yellow");
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
  if (mouseIsPressed === true) {
    if (shootState === "ready") {
      bullets.push({
        x: x + w / 2,
        y: y
      });
      State = "cooldown";
      shootTimer = 10;
    }
    if (shootState === "cooldown") {
      shootTimer--;
      if (shootTimer <= 0) {
        shootState = "ready";
      }
    }
  }
}

function createEnemy() {
  enemies.push({
    x: random(50, width - 50),
    y: -40,
    w: 40,
    h: 40,
    speed: 2
  });
}

function drawEnemies() {
  fill("red");

  for (let enemy of enemies) {
    rect(enemy.x, enemy.y, enemy.w, enemy.h);
  }
}

function checkBulletEnemyCollision() {
  for (let i = bullets.length - 1; i >= 0; i--) {
    for (let j = enemies.length - 1; j >= 0; j--) {
      if (
        bullets[i].x < enemies[j].x + enemies[j].w &&
        bullets[i].x + 5 > enemies[j].x &&
        bullets[i].y < enemies[j].y + enemies[j].h &&
        bullets[i].y + 15 > enemies[j].y
      ) {

        bullets.splice(i, 1);
        enemies.splice(j, 1);
        score++;

        break;
      }
    }
  }
}

function moveEnemies () {
  for (let enemy of enemies) {
    enemy.y += enemy.speed;
    if (enemy.y + enemy.h >= height) {
      gameState = "gameover";
    }
  }
  enemies = enemies.filter(enemy => enemy.y < height + 50);
}

function spawnEnemies() {
  spawnTimer++;
  if (spawnTimer >= 60) {
    createEnemy();
    spawnTimer = 0;
  }
}

function drawScore() {
  fill("white");
  textSize(24);
  text("score: " + score, 20, 30);
}
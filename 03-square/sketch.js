// square moving around edge of screen
let x =0;
let y =0;
let speed = 10;
let s = 60;
let state = "right";
async function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  movingsquare();
  displaysquare();
}

function displaysquare(){
  fill("black");
  square(x, y, s);
}

function movingsquare() {
  if (state === "right") {
    x += speed;
    if (x >= width - s) {
      state = "down";
    }
  }
  else if (state === "down") {
    y += speed;
    if (y >= height - s) {
      state = "left";
    }
  }
  else if (state === "left") {
    x -= speed;
    if (x <= 0) {
      state = "up";
    }
  }
  else if (state === "up") {
    y -= speed;
    if (y <= 0) {
      state = "right";
    }
  }
}

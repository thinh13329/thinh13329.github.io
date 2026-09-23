// Millis Demo

let waitTime = 2000;
let state = "red";
let lastSwapTime =0;

async function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  swapStateIfNeeded();
  drawBackGround();

  // console.log(millis());
}

function swapStateIfNeeded() {
  if (millis() > lastSwapTime + waitTime) {
    lastSwapTime = millis();
    if (state === "red") {
      state = "black";
    }
    else if (state === "black") {
      state = "red";
    }
  }
}

function drawBackGround() {
  if (state === "black") {
    background("black");
    
  }
  else if (state ==="red") {
    background("red");
  }
}
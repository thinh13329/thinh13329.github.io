// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
const GREEN = 'green';
const YELLOW = 'yellow';
const RED = 'red';
let state = GREEN;
let lastSwitchTime = 0;
let greenlightduration = 3000;
let yellowlightduration = 500;
let redlightduration = 3000;

async function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(255);
  drawOutlineOfLights();
  trafficLight();
  chooseCorrectLight();
}

function chooseCorrectLight() {
  if (state === GREEN && millis() >= lastSwitchTime + greenlightduration) {
    state = YELLOW;
    lastSwitchTime = millis();
  }

  if (state === YELLOW && millis() >= lastSwitchTime + yellowlightduration) {
    state = RED;
    lastSwitchTime = millis();
  }

  if (state === RED && millis() >= lastSwitchTime + redlightduration) {
    state = GREEN;
    lastSwitchTime = millis();
  }
} 

function drawOutlineOfLights() {
  //box
  rectMode(CENTER);
  fill(0);
  rect(width/2, height/2, 75, 200, 10);

  //lights
  fill(255);
  ellipse(width/2, height/2 - 65, 50, 50); //top
  ellipse(width/2, height/2, 50, 50); //middle
  ellipse(width/2, height/2 + 65, 50, 50); //bottom
}

function trafficLight() {
  if (state === GREEN) {
    fill('green');
    ellipse(width/2, height/2 - 65, 50, 50);
  }
  if (state === YELLOW) {
    fill('yellow');
    ellipse(width/2, height/2, 50, 50);
  }
  if (state === RED) {
    fill('red');
    ellipse(width/2, height/2 + 65, 50, 50);
  }
}
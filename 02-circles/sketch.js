// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


async function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  // background(220);
  DrawCircles();
}
function DrawCircles() {
  fill(random(0, 255), random(0, 255), random(0, 255));
  circle(random(0, width), random(0, height), random(30, 100));
}

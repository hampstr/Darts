
let canvas


function setup() {
  canvas = createCanvas(700, 700);
}

function draw() {
  background(255);
  canvas.position(windowWidth/2 - width/2, windowHeight/2 - height/2);

  fill(255, 0, 0)
  strokeWeight(10)
  circle(width/2, height/2, 600)
  fill(255, 255, 0)
  circle(width/2, height/2, 350)
  fill(0, 255, 0)
  circle(width/2, height/2, 100)
}

let canvas
let moveMode = "vertical"
let mainFont
let isStarted = false


function preload(){
  mainFont = loadFont("Cocogoose-Pro-Regular-trial.ttf")
}

function setup() {
  canvas = createCanvas(700, 700);
  textAlign(CENTER, CENTER);
  textFont(mainFont)
}

function draw() {
  background(255);
  canvas.position(windowWidth/2 - width/2, windowHeight/2 - height/2);
  strokeWeight(10)

  stroke(0)
  
  fill("#2D3142")
  circle(width/2, height/2, 600)
  
  fill("#4F5D75")
  circle(width/2, height/2, 350)
  
  
  fill("#EF8354")
  circle(width/2, height/2, 100)

  if (!isStarted) {
    fill(255, 255, 255, 140)
    stroke(0)
    rect(50, 260, width-100, height/4)
    textSize(40)
    fill(255)
    text("Press Space To Start", 50 + (width-100)/2, 260 + (height/4)/2)
  }
}


function mouseReleased() {
  
}

function keyPressed() {
  if (keyCode === 32) {
    isStarted = true
  }
}
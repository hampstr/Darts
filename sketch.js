
let canvas
let moveMode = "vertical"
let mainFont
let isStarted = false
let movingDirection = "none"
let ballD = 30
let ballX;
let ballY;
let ballSpeed = 2
let lastDirection

let throwX;
let throwY;

let targetX;
let targetY;

function preload(){
  mainFont = loadFont("Cocogoose-Pro-Regular-trial.ttf")
}

function setup() {
  canvas = createCanvas(800, 700);
  textAlign(CENTER, CENTER);
  textFont(mainFont)
  ballX = ballD + 50
  ballY = height - ballD
  targetX = width/2
  targetY = height/2
  console.log(targetX + targetY)
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
    rect(50, 260, width-100, height/4, 20)
    strokeWeight(6)
    textSize(40)
    fill(255)
    text("Press Space To Start", 50 + (width-100)/2, 260 + (height/4)/2)
  }
  
  if (isStarted) {
    strokeWeight(5)
    fill(0, 0, 0, 100)
    stroke(0, 0, 0, 70)
    if (movingDirection == "horizontal") {
      line(ballX, ballY, ballX, 0)
    }
    if (movingDirection == "vertical") {
      line(ballX, ballY, width, ballY)
    }
    strokeWeight(2)
    stroke(0, 0, 0, 150)
    fill(10, 10, 10, 230)
    circle(ballX, ballY, ballD)
  }

  if (movingDirection == "horizontal") {
    ballX += ballSpeed
    if (ballX + ballD > width - 50) {
      ballSpeed *= -1
    }
    if (ballX - ballD < 50) {
      ballSpeed *= -1
    }
  }
  if (movingDirection == "vertical") {
    ballY += ballSpeed
    if (ballY + ballD > height) {
      ballSpeed *= -1
    }
    if (ballY - ballD < 0) {
      ballSpeed *= -1
    }
  }
}
function keyPressed() {
  if (keyCode === 32) {
    if (!isStarted) {
      isStarted = true
      movingDirection = random(0, 1) > 0.5 ? "vertical" : "horizontal"
      return
    }
    else if (!lastDirection) {
      if (movingDirection == "vertical") {
        throwY = ballY
      } 
      if (movingDirection == "horizontal") {
        throwX = ballX
      }
      ballX = ballD + 50
      ballY = height - ballD
      
      if (movingDirection == "vertical") {
        movingDirection = "horizontal"
      }
      else {
        movingDirection = "vertical"
      }

      lastDirection = true
    }
    else if (lastDirection) {
      if (movingDirection == "vertical") {
        throwY = ballY
      } 
      if (movingDirection == "horizontal") {
        throwX = ballX
      }

      totalThrow = throwX + throwY
      totalTarget = targetX + targetY

      if (totalTarget - totalThrow != 0 || totalTarget - totalThrow != 1) {
        window.alert(`You were off by ${abs(totalTarget - totalThrow)} points!`)
      } 
      window.alert("Perfect score!")
      location.reload()
    }
  }
}
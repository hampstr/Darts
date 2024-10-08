
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
let maxBallSpeed = 10
let minBallSpeed = 2
let throwX;
let throwY;
let possibleSpeeds = []
let targetX;
let targetY;
let highScore;
let highScoreText = document.getElementById("highscore")
let throwSFX;
let newHighscoreSFX;
let perfectSFX;
let gameEndSFX;

function preload(){
  mainFont = loadFont("Rubik-Regular.ttf")
  throwSFX = loadSound("throw.mp3")
  newHighscoreSFX = loadSound("newHighscore.mp3")
  perfectSFX = loadSound("perfect.mp3")
  gameEndSFX = loadSound("gameEnd.mp3")
}


function generateAllPossibleBallSpeeds() {
  possibleSpeeds = []
  for (let i = minBallSpeed; i <= maxBallSpeed; i++) {
    // console.log(i)
    if ((targetX % i == 0 && targetY % i == 0) || (targetX % i == 1 && targetY % i == 1)) {
      possibleSpeeds.push(i)
    } 
  }
}

function newBallSpeed() { 
  generateAllPossibleBallSpeeds()
  return possibleSpeeds[int(random(0, possibleSpeeds.length))]
}

function setup() {
  canvas = createCanvas(800, 700);
  textAlign(CENTER, CENTER);
  textFont(mainFont)
  ballX = ballD + 50
  ballY = height - ballD
  targetX = width/2
  targetY = height/2
  ballSpeed = newBallSpeed()

  highScore = localStorage.getItem("highscore")
  if (highScore == null) {
    highScore = "N/A"
  } 

  else {
    if (highScore != "Perfect" && highScore != "0") {
      highScore = int(highScore)
    }
    if (highScore == "0") {
      localStorage.setItem("highscore", "Perfect")
    }
  }

  highScoreText.innerHTML = `Highscore: ${highScore} points away from perfect!`

  if (highScore == "N/A") {
    highScoreText.innerHTML = `Highscore: N/A`
  }

  if (highScore == "Perfect") {
    highScoreText.innerHTML = `Highscore: <span id="perfect">Perfect</span>`
  }




  // console.log(targetX + targetY)
}

function draw() {
  background(255);
  canvas.position(windowWidth/2 - width/2, (windowHeight/2 - height/2) + 40);
  strokeWeight(10)

  stroke(0)
  
  fill("#2D3142")
  circle(width/2, height/2, 600)
  
  fill("#4F5D75")
  circle(width/2, height/2, 350)
  
  
  fill("#EF8354")
  circle(width/2, height/2, 100)
  
  fill("#EF8354")
  circle(width/2, height/2, 10)

  stroke(255, 222, 89, 200)
  strokeWeight(7)
  if (throwX) {
    line(throwX, height, throwX, 0)
  }
  if (throwY) {
    line(0, throwY, width, throwY)
  }


  if (!isStarted) {
    fill(255, 255, 255, 140)
    stroke(0)
    rect(50, 260, width-100, height/4, 20)
    strokeWeight(6)
    textSize(65)
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

    if (ballX == targetX || ballX-- == targetX || ballX++ == targetX) {
      // console.log("perfect horizontal")
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

    if (ballY == targetY || ballY-- == targetY || ballY++ == targetY) {
      // console.log("perfect horizontal")
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
      ballSpeed = newBallSpeed()
      if (movingDirection == "vertical") {
        movingDirection = "horizontal"
      }
      else {
        movingDirection = "vertical"
      }
      throwSFX.play()
      lastDirection = true
    }
    else if (lastDirection) {
      if (movingDirection == "vertical") {
        throwY = ballY
      } 
      if (movingDirection == "horizontal") {
        throwX = ballX
      }
      throwSFX.play()
      totalThrow = throwX + throwY
      totalTarget = targetX + targetY

      if (totalTarget - totalThrow != 0 || totalTarget - totalThrow != 1) {
        window.alert(`You were off by ${abs(totalTarget - totalThrow)} points!`)
      } 
      if (abs(totalTarget - totalThrow) == 0 || abs(totalTarget - totalThrow) == 1) {
        perfectSFX.play()
        window.alert("Perfect score!")
        localStorage.setItem("highscore", "Perfect")
      }

      if (highScore > abs(totalTarget - totalThrow) || highScore == "N/A") {
        newHighscoreSFX.play()
        window.alert("New Highscore!")
        localStorage.setItem("highscore", str(abs(totalTarget - totalThrow)))
      }
      else {
        gameEndSFX.play()
      }
      ballSpeed = 0
      location.reload()
    }
  }
}
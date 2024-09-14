
let canvas
let autoStartGame = true
let moveMode = "vertical"




function setup() {
  canvas = createCanvas(700, 700);
  if (!autoStartGame) {
    confirm("Start?")
  }
}

function draw() {
  background(255);
  canvas.position(windowWidth/2 - width/2, windowHeight/2 - height/2);
  strokeWeight(10)


  // fill(200, 0, 0)
  fill(211, 145, 229)
  circle(width/2, height/2, 600)


  // fill(255, 222, 89)
  fill(154, 98, 170)
  circle(width/2, height/2, 350)


  // fill(94, 160, 68)
  fill(117, 57, 134)
  circle(width/2, height/2, 100)


}


function mouseReleased() {

}
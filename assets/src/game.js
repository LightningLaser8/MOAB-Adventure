const ui = {
  menuState: "start"
}
//Initial values for canvas width and height
const baseWidth = 1920
const baseHeight = 1080
//scale everything
let contentScale = 1

//Get the biggest possible canvas that fits on the current screen, preserving aspect ratio
function getCanvasDimensions(baseWidth, baseHeight){
  const aspectRatio = baseWidth/baseHeight
  let [canvasWidth, canvasHeight] = [windowWidth, windowHeight]
  let [widthRatio, heightRatio] = [canvasWidth/baseWidth, canvasHeight/baseHeight]
  if(widthRatio < heightRatio){
    [canvasWidth, canvasHeight] = [windowWidth, windowWidth / aspectRatio]
    contentScale = canvasHeight/windowHeight
  }
  else{
    [canvasWidth, canvasHeight] = [windowHeight * aspectRatio, windowHeight]
    
    contentScale = canvasWidth/windowWidth
  }
  return [canvasWidth, canvasHeight]
}


//Set up the canvas, using the previous function
function setup(){
  createCanvas(...getCanvasDimensions(baseWidth, baseHeight))
  rectMode(CENTER)
}
//Change the size if the screen size changes
function windowResized(){
  resizeCanvas(...getCanvasDimensions(baseWidth, baseHeight))
}

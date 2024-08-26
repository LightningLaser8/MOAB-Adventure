const ui = {
  menuState: "title",
  waitingForMouseUp: false,
  get mouse() {
    return {
      x: mouseX / contentScale,
      y: mouseY / contentScale,
    };
  },
  components: [],
};
//Initial values for canvas width and height
const baseWidth = 1920;
const baseHeight = 1080;
//scale everything
let contentScale = 1;

//Get the biggest possible canvas that fits on the current screen, preserving aspect ratio
function getCanvasDimensions(baseWidth, baseHeight) {
  const aspectRatio = baseWidth / baseHeight;
  let [canvasWidth, canvasHeight] = [windowWidth, windowHeight];
  let [widthRatio, heightRatio] = [
    canvasWidth / baseWidth,
    canvasHeight / baseHeight,
  ];
  if (widthRatio < heightRatio) {
    [canvasWidth, canvasHeight] = [windowWidth, windowWidth / aspectRatio];
    contentScale = canvasWidth / baseWidth;
  } else {
    [canvasWidth, canvasHeight] = [windowHeight * aspectRatio, windowHeight];
    contentScale = canvasHeight / baseHeight;
  }
  return [canvasWidth, canvasHeight];
}

let images = {};
let fonts = {};
let backgroundGradient

function preload() {
  //Load screen images
  images.screen = {};
  images.screen.title = loadImage("/assets/textures/screens/title.png");
  images.ui = {};
  images.ui.background = loadImage("/assets/textures/ui/background.png");
  fonts.ocr = loadFont("/assets/font/OCRAEXT.ttf");
  fonts.darktech = loadFont("/assets/font/darktech_ldr.ttf");
}
//Set up the canvas, using the previous function
function setup() {
  createCanvas(...getCanvasDimensions(baseWidth, baseHeight));
  backgroundGradient = createGraphics(1, 100)
  for(let y = 0; y < 100; y++){ //For each vertical unit
    let col = [0, 200 * y/100, 255 * y/100] //Get colour interpolation
    backgroundGradient.noStroke() //Remove outline
    backgroundGradient.fill(col) //Set fill colour to use
    backgroundGradient.rect(0, y, 2, 1) //Draw the rectangle
  }
  rectMode(CENTER);
  imageMode(CENTER);
  textFont(fonts.darktech);
}
//Change the size if the screen size changes
function windowResized() {
  resizeCanvas(...getCanvasDimensions(baseWidth, baseHeight));
}

//p5's draw function - called 60 times per second
function draw() {
  clear();
  image(backgroundGradient, 960, 540, 1920, 1080)
  scale(contentScale);
  //Pre-UI stuff, like background images
  if (ui.menuState === "title") drawTitleScreen();
  //Tick, then draw the UI
  tickUI()
  drawUI()
  //Reset mouse held status
  if (ui.waitingForMouseUp && !mouseIsPressed) ui.waitingForMouseUp = false;
}
//Because UI Components don't have images
function drawTitleScreen() {
  image(images.screen.title, 960, 540);
}

function drawUI(){
  for(let component of ui.components){
    if(component.acceptedScreens.includes(ui.menuState)) component.draw()
  }
}

function tickUI(){
  for(let component of ui.components){
    if(component.acceptedScreens.includes(ui.menuState) && component.isInteractive){
      component.checkMouse()
    }
  }
}
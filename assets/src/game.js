const game = {
  difficulty: "normal",
  mode: "adventure",
  saveslot: 1,
  control: "keyboard"
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

let fonts = {};
let backgroundGradient;

async function preload() {
  //For each category defined
  for (let category in Object.getOwnPropertyDescriptors(images)) {
    //For each image in it
    for (let image in Object.getOwnPropertyDescriptors(images[category])) {
      let thing = images[category][image];
      //Load it if it's an image container
      if (thing instanceof ImageContainer) {
        await thing.load();
      }
    }
  }
  fonts.ocr = loadFont("/assets/font/ocr_a_extended.ttf");
  fonts.darktech = loadFont("/assets/font/darktech_ldr.ttf");
}
//Set up the canvas, using the previous function
function setup() {
  createCanvas(...getCanvasDimensions(baseWidth, baseHeight));
  backgroundGradient = createGraphics(1, 100);
  for (let y = 0; y < 100; y++) {
    //For each vertical unit
    let col = [0, (200 * y) / 100, (255 * y) / 100]; //Get colour interpolation
    backgroundGradient.noStroke(); //Remove outline
    backgroundGradient.fill(col); //Set fill colour to use
    backgroundGradient.rect(0, y, 2, 1); //Draw the rectangle
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
  scale(contentScale);
  image(backgroundGradient, 960, 540, 1920, 1080);
  //Tick, then draw the UI
  updateUIActivity();
  tickUI();
  drawUI();
  //Reset mouse held status
  if (ui.waitingForMouseUp && !mouseIsPressed) ui.waitingForMouseUp = false;
  showMousePos();
}

function updateUIActivity() {
  //Check each component, but only do it once.
  for (let component of ui.components) {
    component.updateActivity();
  }
}

function drawUI() {
  for (let component of ui.components) {
    if (component.active) {
      component.draw();
    }
  }
}

function tickUI() {
  for (let component of ui.components) {
    if (component.active && component.isInteractive) {
      component.checkMouse();
    }
  }
}

//Ignore for NEA Writeup - dev function
function showMousePos() {
  push();
  textAlign(CENTER, CENTER);
  textFont(fonts.ocr);
  fill(255);
  stroke(0);
  strokeWeight(2);
  textSize(40);
  text(
    "X:" + Math.round(ui.mouse.x) + " Y:" + Math.round(ui.mouse.y),
    ui.mouse.x,
    ui.mouse.y - 50
  );
  stroke(255);
  strokeWeight(2);
  line(ui.mouse.x - 20, ui.mouse.y, ui.mouse.x + 20, ui.mouse.y);
  line(ui.mouse.x, ui.mouse.y - 20, ui.mouse.x, ui.mouse.y + 20);
  pop();
}

const ui = {
  menuState: "title",
  waitingForMouseUp: false,
  get mouse() {
    return {
      x: mouseX / contentScale,
      y: mouseY / contentScale,
    };
  },
  conditions: {},
  components: [],
  //Volume percentage
  volume: 50,
  //Percentages for different parts
  //Multiplicative with `volume`
  piecewiseVolume: {
    music: 100,
    weapons: 100,
    entities: 100,
  },
};

class UIComponent {
  static invert(uicomponent) {
    uicomponent.inverted = true;
    uicomponent.y *= -1;
    return uicomponent;
  }
  static setBackgroundOf(uicomponent, colour = null) {
    uicomponent.backgroundColour = colour;
    return uicomponent;
  }
  static removeOutline(uicomponent) {
    uicomponent.outline = false;
    return uicomponent;
  }
  static setOutlineColour(uicomponent, colour = null) {
    uicomponent.outlineColour = colour;
    return uicomponent;
  }
  static alignRight(uicomponent) {
    uicomponent.ox = uicomponent.x; //Save old x
    Object.defineProperty(uicomponent, "x", {
      get: () => uicomponent.ox - textWidth(uicomponent.text) / 2, //Add width to it
    });
    return uicomponent;
  }
  static alignLeft(uicomponent) {
    uicomponent.ox = uicomponent.x; //Save old x
    Object.defineProperty(uicomponent, "x", {
      get: () => uicomponent.ox + textWidth(uicomponent.text) / 2, //Add width to it
    });
    return uicomponent;
  }
  //Evaluates property:value on game ui: input "slot:1" => if "slot" is "1" (or equivalent, e.g. 1) return true, else false
  static evaluateCondition(condition) {
    const parts = condition.split(":"); //Separate property <- : -> value
    if (parts.length !== 2) {
      //If extra parameters, or not enough:
      return true; //Basically ignore
    }
    if (ui.conditions[parts[0]]) {
      //Separate property values
      let values = parts[1].split("|");
      //If property exists
      return values.includes(ui.conditions[parts[0]]); //Check it and return
    }
    return true; //If unsure, ignore
  }
  //Sets property:value on game ui: input "slot:1" => sets "slot" to "1"
  static setCondition(condition) {
    const parts = condition.split(":"); //Separate property <- : -> value
    if (parts.length !== 2) {
      //If extra parameters
      return; //Cancel
    }
    ui.conditions[parts[0]] = parts[1]; //Set the property
  }
  acceptedScreens = [];
  conditions = [];
  interactive = false;
  active = false;
  inverted = false;
  outline = true;
  backgroundColour = null;
  updateActivity() {
    //It's active if it should show *and* all the conditions are met
    this.active =
      this.acceptedScreens.includes(ui.menuState) && this.getActivity();
  }
  getActivity() {
    if (this.conditions[0] === "any") {
      return this.getActivityAnyCondition();
    }
    for (let condition of this.conditions) {
      //Short-circuiting: if one returns false, don't even bother checking the others, it's not active.
      if (!UIComponent.evaluateCondition(condition)) return false;
    }
    return true;
  }
  getActivityAnyCondition() {
    for (let condition of this.conditions) {
      if (condition === "any") continue;
      //Short-circuiting: if one returns true, don't even bother checking the others, it's active.
      if (UIComponent.evaluateCondition(condition)) return true;
    }
    return false;
  }
  constructor(
    x = 0,
    y = 0,
    width = 1,
    height = 1,
    bevel = "none",
    onpress = () => {},
    shownText = "",
    useOCR = false,
    shownTextSize = 20
  ) {
    //Initialise component
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.outlineColour = [50, 50, 50];
    this.emphasisColour = [255, 255, 0];
    this.emphasised = false;
    this.ocr = useOCR;
    this.text = shownText;
    this.textSize = shownTextSize;
    this.bevel = bevel;
    this.press = onpress;
    this.interactive = !!onpress;
  }
  draw() {
    push();
    noStroke();
    if (this.inverted) scale(1, -1);
    if (this.width > 0 && this.height > 0) {
      if (this.outline && this.outlineColour) {
        fill(...this.outlineColour);
        if (this.emphasised) fill(...this.emphasisColour);
        push();
        if (this.bevel !== "none") {
          beginClip({ invert: true });
          //Cut out triangle from the right of the outline
          if (this.bevel === "right" || this.bevel === "both") {
            triangle(
              this.x + (this.width + 20) / 2 - this.height,
              this.y + (this.height + 20) / 2,
              this.x + (this.width + 20) / 2 + 20,
              this.y - (this.height + 20) / 2,
              this.x + (this.width + 20) / 2 + 20,
              this.y + (this.height + 20) / 2
            );
          }
          //Cut out triangle from the left of the outline
          if (this.bevel === "left" || this.bevel === "both") {
            triangle(
              this.x - (this.width + 20) / 2 + this.height,
              this.y - (this.height + 20) / 2,
              this.x - (this.width + 20) / 2 - 20,
              this.y + (this.height + 20) / 2,
              this.x - (this.width + 20) / 2 - 20,
              this.y - (this.height + 20) / 2
            );
          }
          endClip();
        }
        //Draw outline behind background
        rect(
          this.x +
            (this.bevel === "right" ? 10 : this.bevel === "left" ? -10 : 0),
          this.y,
          this.width +
            (this.bevel === "right" || this.bevel === "left"
              ? 38
              : this.bevel === "both"
              ? 56
              : 18) -
            2,
          this.height + 18
        );
        pop();
      }
      push();
      //Add bevels
      if (this.bevel !== "none") {
        beginClip({ invert: true });
        //Cut out triangle from the right of the background
        if (this.bevel === "right" || this.bevel === "both") {
          triangle(
            this.x + this.width / 2 - this.height,
            this.y + this.height / 2,
            this.x + this.width / 2,
            this.y - this.height / 2,
            this.x + this.width / 2,
            this.y + this.height / 2
          );
        }
        //Cut out triangle from the left of the background
        if (this.bevel === "left" || this.bevel === "both") {
          triangle(
            this.x - this.width / 2 + this.height,
            this.y - this.height / 2,
            this.x - this.width / 2,
            this.y + this.height / 2,
            this.x - this.width / 2,
            this.y - this.height / 2
          );
        }
        endClip();
      }
      //Draw BG
      if (this.backgroundColour) {
        fill(...this.backgroundColour);
        rect(this.x, this.y, this.width - 2, this.height - 2);
      } else {
        drawImg(
          "ui.background",
          this.x,
          this.y,
          this.width - 2,
          this.height - 2,
          0,
          0,
          this.width - 2,
          this.height - 2
        );
      }
      pop();
    }
    //Draw optional text
    noStroke();
    textFont(this.ocr ? fonts.ocr : fonts.darktech);
    if (this.ocr) {
      stroke(0);
      strokeWeight(this.textSize / 15);
    }
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(this.textSize);
    text(this.text, this.x, this.y);
    pop();
  }
  checkMouse() {
    // If the mouse is colliding with the button
    if (
      ui.mouse.x < this.x + this.width / 2 &&
      ui.mouse.x > this.x - this.width / 2 &&
      ui.mouse.y < this.y + this.height / 2 &&
      ui.mouse.y > this.y - this.height / 2
    ) {
      //And mouse is down
      if (mouseIsPressed) {
        this.outlineColour = [0, 255, 255];
        //And the UI isn't waiting
        if (!ui.waitingForMouseUp) {
          //Click
          this.press();
          //And make the UI wait
          ui.waitingForMouseUp = true;
        }
      } else {
        this.outlineColour = [0, 128, 128];
      }
    } else {
      this.outlineColour = [50, 50, 50];
    }
  }
}

class ImageUIComponent extends UIComponent {
  constructor(
    x = 0,
    y = 0,
    width = 1,
    height = 1,
    shownImage = null,
    onpress = () => {},
    outline = true
  ) {
    //Initialise component
    super(x, y, width, height, "none", onpress, "", false, 0);
    this.image = shownImage;
    this.outline = outline;
  }
  draw() {
    push();
    fill(...this.outlineColour);
    if (this.emphasised) fill(...this.emphasisColour);
    //Draw outline behind background
    if (this.outline) rect(this.x, this.y, this.width + 18, this.height + 18);
    //Draw image
    drawImg(this.image, this.x, this.y, this.width - 2, this.height - 2);
    pop();
  }
}

function drawImg(
  img = "error",
  x,
  y,
  width,
  height,
  ...otherParameters //IDK what else p5 image takes
) {
  noSmooth();
  //Get from registry if it exists
  img = Registry.images.has(img) ? Registry.images.get(img) : img;
  if (img instanceof ImageContainer) {
    if (!img.image) return; //Cancel if no image loaded yet
    image(img.image, x, y, width, height, ...otherParameters);
  } else {
    //Try to draw it directly if not
    try {
      image(img, x, y, width, height, ...otherParameters);
    } catch (error) {
      //Say the problem
      console.error("Could not draw image: ", img);
      //Replace with a working image
      drawImg("error", x, y, width, height, ...otherParameters);
    }
  }
}

function rotatedImg(img = "error", x, y, width, height, angle) {
  push(); //Save current position, rotation, etc
  translate(x, y); //Move middle to 0,0
  rotate(angle);
  drawImg(img, 0, 0, width, height);
  pop(); //Return to old state
}

function rotatedShape(shape = "circle", x, y, width, height, angle) {
  push(); //Save current position, rotation, etc
  translate(x, y); //Move middle to 0,0
  rotate(angle);
  switch (shape) {
    case "circle":
      circle(0, 0, (width + height) / 2);
      break;
    case "square":
      square(0, 0, (width + height) / 2);
      break;
    case "ellipse":
      ellipse(0, 0, width, height);
      break;
    case "rect":
      rect(0, 0, width, height);
      break;
    case "rhombus":
      scale(width, height); //Change the size
      rotate(QUARTER_PI); //turn it
      square(0, 0, 1); //make a square
      scale(1, 1); //scale back
      rotate(-QUARTER_PI); //turn back
      break;
    default:
      break;
  }
  pop(); //Return to old state
}

class SliderUIComponent extends UIComponent {
  _current = 0;
  constructor(
    x = 0,
    y = 0,
    width = 1,
    sliderLength = 1,
    height = 1,
    bevel = "none",
    shownText = "",
    useOCR = false,
    shownTextSize = 20,
    onchange = (value) => {},
    min = 0,
    max = 100,
    current = null
  ) {
    super(
      x,
      y,
      width,
      height,
      bevel,
      undefined,
      shownText,
      useOCR,
      shownTextSize
    );
    //Change callback
    this.change = onchange;
    this.length = sliderLength;
    this.min = min;
    this._current = current ?? (min + max) / 2;
    this.max = max;
  }
  draw() {
    push();
    //Outline
    fill(this.outlineColour);
    rect(
      this.x + (this.width + this.length) / 2 - this.height / 2,
      this.y,
      this.length + this.height + 18,
      this.height / 2 + 18
    );
    //Empty bit
    fill(0);
    rect(
      this.x + (this.width + this.length) / 2 - this.height / 2,
      this.y,
      this.length + this.height - 2,
      this.height / 2 - 2
    );
    //Full bit
    fill(255, 255, 0);
    //Get minimum X
    let minX = this.x + this.width / 2;
    //Calculate width of bar
    let w = (this._current / this.max) * this.length + this.height / 2;
    //Draw full bit
    rect(minX + w / 2 - this.height / 2, this.y, w, this.height / 2);
    //Draw the title bit
    super.draw();
    pop();
  }
  checkMouse() {
    //Set min/max x positions
    let minX = this.x + this.width / 2,
      maxX = this.x + this.width / 2 + this.length;
    // If the mouse is colliding with the button
    if (
      ui.mouse.x < maxX &&
      ui.mouse.x > minX &&
      ui.mouse.y < this.y + this.height / 2 &&
      ui.mouse.y > this.y - this.height / 2
    ) {
      //And mouse is down
      if (mouseIsPressed) {
        // - But don't wait, so smooth movement

        this.outlineColour = [0, 255, 255];
        //Click and change values
        this._current = ((ui.mouse.x - minX) / this.length) * this.max;
        this.change(this._current);
        //And make the UI wait
        ui.waitingForMouseUp = true;
      } else {
        this.outlineColour = [0, 128, 128];
      }
    } else {
      this.outlineColour = [50, 50, 50];
    }
  }
}

function createUIComponent(
  screens = [],
  conditions = [],
  x = 0,
  y = 0,
  width = 1,
  height = 1,
  bevel = "none",
  onpress = null,
  shownText = "",
  useOCR = false,
  shownTextSize = 20
) {
  //Make component
  const component = new UIComponent(
    x,
    y,
    width,
    height,
    bevel,
    onpress ?? (() => {}),
    shownText,
    useOCR,
    shownTextSize
  );
  component.conditions = conditions;
  //Set conditional things
  component.acceptedScreens = screens;
  component.isInteractive = !!onpress;
  //Add to game
  ui.components.push(component);
  return component;
}

function createUIImageComponent(
  screens = [],
  conditions = [],
  x = 0,
  y = 0,
  width = 1,
  height = 1,
  onpress = null,
  shownImage = null,
  outline = true
) {
  //Make component
  const component = new ImageUIComponent(
    x,
    y,
    width,
    height,
    shownImage,
    onpress ?? (() => {}),
    outline
  );
  component.conditions = conditions;
  //Set conditional things
  component.acceptedScreens = screens;
  component.isInteractive = !!onpress;
  //Add to game
  ui.components.push(component);
  return component;
}

function createGamePropertySelector(
  screens = [],
  conditions = [],
  x = 0,
  y = 0,
  bufferWidth = 1,
  optionWidth = 1,
  height = 1,
  property = "",
  options = [""],
  defaultOption = null,
  shownTexts = [""],
  shownTextSize = 50,
  onchange = (value) => {}
) {
  //Create display name
  createUIComponent(
    screens,
    conditions,
    x + property.length * shownTextSize * 0.375 + 50,
    y - 65,
    0,
    0,
    "none",
    undefined,
    property,
    false,
    shownTextSize * 0.8
  );
  //Create indicator
  let diffindicator = createUIComponent(
    screens,
    conditions,
    x + bufferWidth / 2,
    y,
    bufferWidth,
    height,
    "right",
    undefined,
    "> ",
    false,
    shownTextSize
  );
  diffindicator.chosen =
    defaultOption in options ? options[defaultOption] : null;
  let len = Math.min(options.length, shownTexts.length); //Get smallest array, don't use blanks
  for (let i = 0; i < len; i++) {
    //For each option or text
    //Make a selector option
    let component = createUIComponent(
      screens,
      conditions,
      x + bufferWidth + optionWidth * (i + 0.5),
      y,
      optionWidth,
      height,
      "both",
      () => {
        game[property] = options[i]; //Set the property
        diffindicator.chosen = options[i];
        onchange(options[i]);
      },
      shownTexts[i],
      true,
      shownTextSize
    );
    //Highlight if the diffindicator has chosen this button's option
    Object.defineProperty(component, "emphasised", {
      get: () => diffindicator.chosen === options[i],
    });
  }
}

function createSliderComponent(
  screens = [],
  conditions = [],
  x = 0,
  y = 0,
  width = 1,
  sliderLength = 100,
  height = 1,
  bevel = "none",
  shownText = "",
  useOCR = false,
  shownTextSize = 20,
  onchange = null,
  min = 0,
  max = 100,
  current = null
) {
  //Make component
  const component = new SliderUIComponent(
    x,
    y,
    width,
    sliderLength,
    height,
    bevel,
    shownText,
    useOCR,
    shownTextSize,
    onchange ?? (() => {}),
    min,
    max,
    current
  );
  component.conditions = conditions;
  //Set conditional things
  component.acceptedScreens = screens;
  component.isInteractive = !!onchange;
  //Add to game
  ui.components.push(component);
  return component;
}

function blendColours(col1, col2, col1Factor) {
  col1[3] ??= 255;
  col2[3] ??= 255;
  let col2Factor = 1 - col1Factor;
  let newCol1 = [
    col1[0] * col1Factor,
    col1[1] * col1Factor,
    col1[2] * col1Factor,
    col1[3] * col1Factor,
  ];
  let newCol2 = [
    col2[0] * col2Factor,
    col2[1] * col2Factor,
    col2[2] * col2Factor,
    col2[3] * col2Factor,
  ];
  let newCol = [
    newCol1[0] + newCol2[0],
    newCol1[1] + newCol2[1],
    newCol1[2] + newCol2[2],
    newCol1[3] + newCol2[3],
  ];
  if (newCol[0] > 255) {
    newCol[0] = 255;
  }
  if (newCol[1] > 255) {
    newCol[1] = 255;
  }
  if (newCol[2] > 255) {
    newCol[2] = 255;
  }
  return newCol;
}

class ImageContainer {
  #image;
  #path;
  constructor(path) {
    this.#path = path;
    this.#image = null;
  }
  update(image) {
    this.#image = image;
  }
  async load() {
    this.#image = await loadImage(this.#path);
    console.log("Loaded image from " + this.#path);
    return true;
  }
  get image() {
    return this.#image;
  }
}

class SoundContainer {
  #sound = null;
  #category = "none";
  #path;
  /**
   * @param {string} path 
   * @param {"weapons" | "entities" | "music"} category 
   */
  constructor(path, category = "none") {
    this.#path = path;
    this.#category = category;
  }
  async load() {
    this.#sound = await loadSound(this.#path);
    console.log("Loaded sound from " + this.#path);
    return true;
  }
  get sound() {
    return this.#sound;
  }
  get category() {
    return this.#category;
  }
}
/**
 * @param {SoundContainer | string} sound 
 * @param {boolean} waitForEnd 
 */
function playSound(sound = null, waitForEnd = false) {
  //So silence is an option
  if (sound === null) return;
  if (sound instanceof SoundContainer) {
    //Set the sound volume to configured one
    sound.sound.setVolume(
      //Default volume * the category's volume.
      (ui.volume / 100) * ((ui.piecewiseVolume[sound.category] ?? 0) / 100)
    );
    //Start playing, if not already
    if (!sound.sound.isPlaying() || !waitForEnd) sound.sound.play();
  } else {
    let snd = Registry.sounds.get(sound);
    //Set the sound volume to configured one
    //No container, so no category
    snd.sound.setVolume(
      //Default volume * the category's volume.
      (ui.volume / 100) * ((ui.piecewiseVolume[snd.category] ?? 0) / 100)
    );
    //Start playing, if not already
    if (!snd.sound.isPlaying() || !waitForEnd) snd.sound.play();
  }
}

function stopSound(sound = null) {
  //So silence is an option
  if (sound === null) return;
  if (sound instanceof SoundContainer) {
    sound.sound.stop();
  } else {
    Registry.sounds.get(sound).sound.stop();
  }
}

function pauseSound(sound = null) {
  //So silence is an option
  if (sound === null) return;
  if (sound instanceof SoundContainer) {
    sound.sound.pause();
  } else {
    Registry.sounds.get(sound).sound.pause();
  }
}

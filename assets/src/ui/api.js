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
};

class UIComponent {
  //Evaluates property:value on game ui: input "slot:1" => if "slot" is "1" (or equivalent, e.g. 1) return true, else false
  static evaluateCondition(condition) {
    const parts = condition.split(":"); //Separate property <- : -> value
    if (parts.length !== 2) {
      //If extra parameters, or not enough:
      return true; //Basically ignore
    }
    if (ui.conditions[parts[0]]) {
      //Separate property values
      let values = parts[1].split("|")
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
  updateActivity() {
    //It's active if it should show *and* all the conditions are met
    this.active =
      this.acceptedScreens.includes(ui.menuState) && this.getActivity();
  }
  getActivity() {
    if(this.conditions[0] === "any") {
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
      if(condition === "any") continue;
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
    if (this.width > 0 && this.height > 0) {
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
            ? 40
            : this.bevel === "both"
            ? 60
            : 20) -
          2,
        this.height + 18
      );
      pop();
      push();
      //Add this.bevels
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
      drawImg(
        images.ui.background,
        this.x,
        this.y,
        this.width - 2,
        this.height - 2,
        0,
        0,
        this.width,
        this.height
      );
      pop();
    }
    //Draw optional text
    noStroke();
    textFont(this.ocr ? fonts.ocr : fonts.darktech);
    if (this.ocr) {
      stroke(0);
      strokeWeight(3);
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

function drawImg(
  img = images.env.error,
  x,
  y,
  width,
  height,
  ...otherParameters //IDK what else p5 image takes
) {
  if (!img) return; //Cancel if no image at all
  if (img instanceof ImageContainer) {
    if (!img.image) return; //Cancel if no image loaded yet
    image(img.image, x, y, width, height, ...otherParameters);
  } else {
    image(img, x, y, width, height, ...otherParameters);
  }
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
    max = 100
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
    this._current = (min + max) / 2;
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
  shownTexts = [""],
  shownTextSize = 50,
  onchange = value => {}
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
        diffindicator.text = (options[i][0] ?? options[i]) + "  "; //Make the indicator show it
        diffindicator.textSize = shownTextSize * 0.8; //Make it fit
        diffindicator.chosen = options[i];
        onchange(options[i])
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
  max = 100
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
    max
  );
  component.conditions = conditions;
  //Set conditional things
  component.acceptedScreens = screens;
  component.isInteractive = !!onchange;
  //Add to game
  ui.components.push(component);
  return component;
}

const images = {
  env: {
    error: new ImageContainer("/assets/textures/error.png")
  },
  screen: {
    title: new ImageContainer("/assets/textures/screens/title.png"),
  },
  ui: {
    background: new ImageContainer("/assets/textures/ui/background.png"),
    moab: new ImageContainer("/assets/textures/ui/moab.png"),
  },
  background: {
    sea: new ImageContainer("/assets/textures/background/sea.png"),
  }
};
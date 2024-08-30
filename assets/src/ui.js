class UIComponent {
  //Evaluates property:value on game ui: input "slot:1" => if "slot" is "1" (or equivalent, e.g. 1) return true, else false
  static evaluateCondition(condition) {
    const parts = condition.split(":"); //Separate property <- : -> value
    if (parts.length !== 2) {
      //If extra parameters, or not enough:
      return true; //Basically ignore
    }
    if (ui.conditions[parts[0]]) {
      //If property exists
      return parts[1] == ui.conditions[parts[0]]; //Check it and return
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
    this.active = this.acceptedScreens.includes(ui.menuState) && this.getActivity();
  }
  getActivity() {
    for (let condition of this.conditions) {
      //Short-circuiting: if one returns false, don't even bother checking the others, it's not active.
      if (!UIComponent.evaluateCondition(condition)) return false;
    }
    return true;
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
      this.x + (this.bevel === "right" ? 10 : this.bevel === "left" ? -10 : 0),
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
  img = new ImageContainer("/assets/textures/error.png"),
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

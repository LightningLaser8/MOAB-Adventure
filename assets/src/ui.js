function generateUIComponent(
  x = 0,
  y = 0,
  width = 1,
  height = 1,
  bevel = "none",
  onpress = () => {},
  shownText = "",
  shownTextSize = 20
) {
  const component = {};
  //Initialise component
  component.x = x;
  component.y = y;
  component.width = width;
  component.height = height;
  component.outlineColour = [50, 50, 50];
  component.emphasisColour = [255, 255, 0];
  component.emphasised = false;
  component.draw = function () {
    push();
    fill(...this.outlineColour);
    if (this.emphasised) fill(...this.emphasisColour);
    push();
    if (bevel !== "none") {
      beginClip({ invert: true });
      //Cut out triangle from the right of the outline
      if (bevel === "right" || bevel === "both") {
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
      if (bevel === "left" || bevel === "both") {
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
      this.x + (bevel === "right" ? 10 : bevel === "left" ? -10 : 0),
      this.y,
      this.width +
        (bevel === "right" || bevel === "left"
          ? 40
          : bevel === "both"
          ? 60
          : 20) -
        2,
      this.height + 18
    );
    pop();
    push();
    //Add bevels
    if (bevel !== "none") {
      beginClip({ invert: true });
      //Cut out triangle from the right of the background
      if (bevel === "right" || bevel === "both") {
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
      if (bevel === "left" || bevel === "both") {
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
    image(
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
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(shownTextSize);
    text(shownText, this.x, this.y);
    pop();
  };
  component.checkMouse = function () {
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
  };
  component.press = onpress;
  return component;
}

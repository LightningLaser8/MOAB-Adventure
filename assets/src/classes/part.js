class Part {
  image = images.env.error;
  x = 0;
  y = 0;
  slide = 0;
  rotation = 0;
  width = 0;
  height = 0;
  constructor() {}
  get rotationRadians() {
    return (this.rotation / 180) * Math.PI;
  }
  draw(weapon) {
    let pos = createVector(weapon.x, weapon.y);
    let angle = weapon.rotationRadians + this.rotationRadians;
    //pos.add(createVector(this.x, this.y))
    let xOffsetVct = p5.Vector.fromAngle(weapon.rotationRadians);
    xOffsetVct.mult(this.x); //Relative horizontal offset from weapon centre
    let yOffsetVct = p5.Vector.fromAngle(weapon.rotationRadians + HALF_PI);
    yOffsetVct.mult(this.y); //Relative vertical offset from weapon centre
    let slideVct = p5.Vector.fromAngle(this.rotationRadians);
    slideVct.mult(this.slide); //Offset in the direction of the part
    let finalPos = p5.Vector.add(
      p5.Vector.add(p5.Vector.add(yOffsetVct, xOffsetVct), slideVct),
      pos
    ); //Add them all up
    if (this.image instanceof ImageContainer) {
      //If it's an image, draw it
      rotatedImg(
        this.image,
        finalPos.x,
        finalPos.y,
        this.width,
        this.height,
        angle
      );
    } else {
      //If it isn't, draw a rectangle
      push();
      fill(255)
      rotatedShape("rect", finalPos.x, finalPos.y, this.width, this.height, angle);
      pop();
    }
  }
}

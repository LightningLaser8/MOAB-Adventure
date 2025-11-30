class Part {
  image = null;
  x = 0;
  y = 0;
  slide = 0;
  rotation = 0;
  width = 0;
  height = 0;
  colour = [200, 200, 200];

  chargeAnimations = [];
  recoilAnimations = [];
  passiveAnimations = [];

  constructor() {}
  get rotationRadians() {
    return (this.rotation / 180) * Math.PI;
  }
  get totalXOffset() {
    let totalOffset = 0;
    for (let ani of [
      ...this.chargeAnimations,
      ...this.recoilAnimations,
      ...this.passiveAnimations,
    ]) {
      totalOffset += ani.xOffset;
    }
    return totalOffset;
  }
  get totalYOffset() {
    let totalOffset = 0;
    for (let ani of [
      ...this.chargeAnimations,
      ...this.recoilAnimations,
      ...this.passiveAnimations,
    ]) {
      totalOffset += ani.yOffset;
    }
    return totalOffset;
  }
  get totalRotOffset() {
    let totalOffset = 0;
    for (let ani of [
      ...this.chargeAnimations,
      ...this.recoilAnimations,
      ...this.passiveAnimations,
    ]) {
      totalOffset += ani.rotOffset;
    }
    return totalOffset;
  }
  get totalSlideOffset() {
    let totalOffset = 0;
    for (let ani of [
      ...this.chargeAnimations,
      ...this.recoilAnimations,
      ...this.passiveAnimations,
    ]) {
      totalOffset += ani.slideOffset;
    }
    return totalOffset;
  }
  draw(weapon) {
    let pos = new Vector(weapon.x, weapon.y);
    let angle = weapon.rotation + this.rotation + this.totalRotOffset;
    //pos.add(createVector(this.x, this.y))
    let xOffsetVct = Vector.fromAngle(weapon.rotation).scale(
      this.x + this.totalXOffset
    ).toPositional(); //Relative horizontal offset from weapon centre
    let yOffsetVct = Vector.fromAngle(weapon.rotation + 90).scale(
      this.y + this.totalYOffset
    ).toPositional(); //Relative vertical offset from weapon centre
    let slideVct = Vector.fromAngle(angle).scale(
      this.slide + this.totalSlideOffset
    ).toPositional(); //Offset in the direction of the part
    let finalPos = pos.add(yOffsetVct.add(xOffsetVct.add(slideVct))); //Add them all up
    if (
      this.image instanceof ImageContainer ||
      typeof this.image === "string"
    ) {
      //If it's an image, draw it
      ImageCTX.draw(
        this.image,
        finalPos.x,
        finalPos.y,
        this.width,
        this.height,
        radians(angle)
      );
    } else {
      //If it isn't, draw a rectangle
      push();
      fill(...this.colour);
      rotatedShape(
        "rect",
        finalPos.x,
        finalPos.y,
        this.width,
        this.height,
        radians(angle)
      );
      pop();
    }
  }
  init() {
    //For each index of charge animation
    for (let i = 0; i < this.chargeAnimations.length; i++) {
      let ani = this.chargeAnimations[i]; //Get animation constructable
      this.chargeAnimations[i] = construct(ani, PartAnimation); //Override with constructed version
    }
    //Same but for recoil
    for (let i = 0; i < this.recoilAnimations.length; i++) {
      let ani = this.recoilAnimations[i];
      this.recoilAnimations[i] = construct(ani, RecoilAnimation);
    }
    //Same but for passive
    for (let i = 0; i < this.passiveAnimations.length; i++) {
      let ani = this.passiveAnimations[i];
      this.passiveAnimations[i] = construct(ani, LoopingAnimation);
    }
    //Start all passive animations
    for (let ani of this.passiveAnimations) {
      ani.start();
    }
  }
  tick() {
    for (let ani of [
      ...this.chargeAnimations,
      ...this.recoilAnimations,
      ...this.passiveAnimations,
    ]) {
      ani.tick(1);
    }
  }
  preFire() {
    for (let ani of this.chargeAnimations) {
      ani.start();
    }
  }
  //Fires on parent weapon fire.
  fire() {
    for (let ani of this.recoilAnimations) {
      ani.start();
    }
    for (let ani of this.chargeAnimations) {
      ani.onEnd();
    }
  }
}

class Part {
  image = images.env.error;
  x = 0;
  y = 0;
  slide = 0;
  rotation = 0;
  width = 0;
  height = 0;

  chargeAnimations = [];
  recoilAnimations = [];
  passiveAnimations = [];

  constructor() {}
  get rotationRadians() {
    return (this.rotation / 180) * Math.PI;
  }
  get totalXOffset() {
    let totalOffset = 0
    for(let ani of [...this.chargeAnimations, ...this.recoilAnimations, ...this.passiveAnimations]){
      totalOffset += ani.xOffset
    }
    return totalOffset
  }
  get totalYOffset() {
    let totalOffset = 0
    for(let ani of [...this.chargeAnimations, ...this.recoilAnimations, ...this.passiveAnimations]){
      totalOffset += ani.yOffset
    }
    return totalOffset
  }
  get totalRotOffset() {
    let totalOffset = 0
    for(let ani of [...this.chargeAnimations, ...this.recoilAnimations, ...this.passiveAnimations]){
      totalOffset += ani.rotOffset
    }
    return totalOffset
  }
  get totalSlideOffset() {
    let totalOffset = 0
    for(let ani of [...this.chargeAnimations, ...this.recoilAnimations, ...this.passiveAnimations]){
      totalOffset += ani.slideOffset
    }
    return totalOffset
  }
  draw(weapon) {
    let pos = createVector(weapon.x, weapon.y);
    let angle = weapon.rotationRadians + this.rotationRadians;
    //pos.add(createVector(this.x, this.y))
    let xOffsetVct = p5.Vector.fromAngle(weapon.rotationRadians);
    xOffsetVct.mult(this.x + this.totalXOffset); //Relative horizontal offset from weapon centre
    let yOffsetVct = p5.Vector.fromAngle(weapon.rotationRadians + HALF_PI);
    yOffsetVct.mult(this.y + this.totalYOffset); //Relative vertical offset from weapon centre
    let slideVct = p5.Vector.fromAngle(this.rotationRadians + radians(this.totalRotOffset));
    slideVct.mult(this.slide + this.totalSlideOffset); //Offset in the direction of the part
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
  init() {
    //For each index of charge animation
    for(let i = 0; i < this.chargeAnimations.length; i++){
      let ani = this.chargeAnimations[i] //Get animation constructable
      this.chargeAnimations[i] = construct(ani) //Override with constructed version
    }
    //Same but for recoil
    for(let i = 0; i < this.recoilAnimations.length; i++){
      let ani = this.recoilAnimations[i]
      this.recoilAnimations[i] = construct(ani)
    }
    //Same but for passive
    for(let i = 0; i < this.passiveAnimations.length; i++){
      let ani = this.passiveAnimations[i]
      this.passiveAnimations[i] = construct(ani)
    }
    //Start all passive animations
    for(let ani of this.passiveAnimations){
      ani.start()
    }
  }
  tick() {
    for(let ani of [...this.chargeAnimations, ...this.recoilAnimations, ...this.passiveAnimations]){
      ani.tick(1)
    }
  }
  preFire() {
    for(let ani of this.chargeAnimations){
      ani.start()
    }
  }
  //Fires on parent weapon fire.
  fire() {
    for(let ani of this.recoilAnimations){
      ani.start()
    }
    for(let ani of this.chargeAnimations){
      ani.onEnd()
    }
  }
}

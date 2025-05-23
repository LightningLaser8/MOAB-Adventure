class ShapeParticle {
  _rotOffset;
  constructor(
    x,
    y,
    direction,
    lifetime,
    speed,
    decel,
    shape,
    colourFrom,
    colourTo,
    sizeXFrom,
    sizeXTo,
    sizeYFrom,
    sizeYTo,
    rotateSpeed,
    moveWithBackground = false
  ) {
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.speed = speed;
    this.lifetime = lifetime;
    this.decel = decel;
    this.shape = shape;
    this.remove = false;
    this.colourFrom = colourFrom;
    this.colourTo = colourTo;
    this.maxLifetime = lifetime;
    this.sizeXFrom = sizeXFrom;
    this.sizeXTo = sizeXTo;
    this.sizeX = sizeXFrom;
    this.sizeYFrom = sizeYFrom;
    this.sizeYTo = sizeYTo;
    this.sizeY = sizeYFrom;
    this.rotateSpeed = rotateSpeed;
    this._rotOffset = 0;
    this.moveWithBackground = moveWithBackground;
  }
  step(dt) {
    if (this.lifetime >= dt) {
      //Interpolate size
      this.sizeX =
        this.sizeXFrom * this.calcLifeFract() +
        this.sizeXTo * (1 - this.calcLifeFract());
      this.sizeY =
        this.sizeYFrom * this.calcLifeFract() +
        this.sizeYTo * (1 - this.calcLifeFract());
      //Move
      this.moveTo(
        this.x + this.speed * p5.Vector.fromAngle(this.direction).x * dt,
        this.y + this.speed * p5.Vector.fromAngle(this.direction).y * dt
      );
      //Move with BG
      if (this.moveWithBackground) this.x -= game.player.speed;
      //Decelerate
      if (this.speed >= this.decel) {
        this.speed -= this.decel * dt;
      } else {
        this.speed = 0;
      }
      if (this.rotateSpeed) {
        this._rotOffset += this.rotateSpeed * dt;
      }
      this.lifetime -= dt;
    } else {
      this.remove = true;
    }
  }
  calcLifeFract() {
    return this.lifetime / this.maxLifetime;
  }
  moveTo(x, y) {
    this.x = x;
    this.y = y;
  }
  draw() {
    push();
    noStroke();
    fill(255);
    //Interpolate colour
    fill(...blendColours(this.colourFrom, this.colourTo, this.calcLifeFract()));
    //Draw the particle
    rotatedShape(
      this.shape,
      this.x,
      this.y,
      this.sizeX,
      this.sizeY,
      this.direction + this._rotOffset + HALF_PI
    );
    pop();
  }
}

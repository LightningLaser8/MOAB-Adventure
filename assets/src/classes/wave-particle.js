class WaveParticle {
  constructor(
    x,
    y,
    lifetime,
    fromRadius,
    toRadius,
    colourFrom,
    colourTo,
    strokeFrom,
    strokeTo,
    moveWithBackground = false
  ) {
    this.x = x;
    this.y = y;
    this.lifetime = lifetime;
    this.fromRadius = fromRadius;
    this.toRadius = toRadius;
    this.radius = fromRadius;
    this.remove = false;
    this.colourFrom = colourFrom;
    this.colourTo = colourTo;
    this.maxLifetime = lifetime;
    this.strokeFrom = strokeFrom;
    this.strokeTo = strokeTo;
    this.moveWithBackground = moveWithBackground;
  }
  step(dt) {
    if (this.lifetime >= dt) {
      this.radius =
        this.fromRadius * this.calcLifeFract() +
        this.toRadius * (1 - this.calcLifeFract());
      //Move with BG
      if (this.moveWithBackground) this.x -= game.player.speed;
      this.lifetime -= dt;
    } else {
      this.remove = true;
    }
  }
  calcLifeFract() {
    return this.lifetime / this.maxLifetime;
  }
  draw() {
    push();
    noFill();
    stroke(blendColours(this.colourFrom, this.colourTo, this.calcLifeFract()));
    strokeWeight(
      this.strokeFrom * this.calcLifeFract() +
        this.strokeTo * (1 - this.calcLifeFract())
    );
    circle(this.x, this.y, this.radius * 2);
    pop();
  }
}

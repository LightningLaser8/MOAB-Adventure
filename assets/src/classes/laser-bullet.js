class LaserBullet extends Bullet {
  //Length of the beam. Replaces speed.
  length = 0;
  #lengthFraction = 0; //Fraction of length the beam is currently at.
  #widthFraction = 1;
  extendTime = -1; //Time taken to get to full length
  despawnTime = -1; //Time taken to disappear fully
  canHurt = true; //Can this laser hurt things?
  followsSource = false;
  /** @type {Weapon} */
  source = null;
  init() {
    super.init();
    if (this.extendTime === -1) this.extendTime = this.maxLife * 0.2;
    if (this.despawnTime === -1) this.despawnTime = this.maxLife * 0.4;
  }
  step(dt) {
    //Not if dead
    if (!this.remove) {
      this.sound();
      if(this.followsSource && this.source){
        this.x = this.source.x;
        this.y = this.source.y;
        this.direction = this.source.rotation;
      }
      this.intervalTick();
      if (this.lifetime >= this.maxLife - this.extendTime && this.canHurt) {
        //If spawning
        this.#lengthFraction += dt / this.extendTime; //Slowly turn to one
      }
      if (this.lifetime <= this.despawnTime) {
        //If despawning
        this.#widthFraction -= dt / this.despawnTime; //Slowly turn to zero
      }
      // Don't move
      //Tick lifetime
      if (this.lifetime <= 0) {
        this.remove = true;
      } else {
        this.lifetime -= dt;
      }
      //Follow
      if(this.followsScreen) this.x -= game.player?.speed ?? 0;
    }
  }
  draw() {
    push();
    //Width is useless, as it is replaced by length, and height is useless as it is replaced by hitsize
    let drawnLength = this.length * this.#lengthFraction;
    let drawnWidth = this.hitSize * 2 * this.#widthFraction;
    //Trigonometry to find offset x and y
    let offset = {
      x: (Math.cos(this.directionRad) * drawnLength) / 2,
      y: (Math.sin(this.directionRad) * drawnLength) / 2,
    };
    if (this.drawer.image) {
      rotatedImg(
        this.drawer.image,
        this.x + offset.x, //Sort of centre the laser
        this.y + offset.y,
        drawnLength,
        drawnWidth,
        this.directionRad
      );
    } else {
      //Get that laser-y look
      stroke(this.drawer.fill);
      fill(255);
      strokeWeight(drawnWidth / 3);
      rotatedShape(
        this.drawer.shape,
        this.x + offset.x,
        this.y + offset.y,
        drawnLength,
        drawnWidth,
        this.directionRad
      );
      pop();
    }
  }
  collidesWith(obj) {
    let currentLength = this.length * this.#lengthFraction;
    let currentHitSize = this.hitSize * this.#widthFraction;
    if(!this.canHurt) return false;
    if(currentHitSize <= 0.01 || currentLength > 5000) return false; //Catch problem where hitsize = 0 causes infinite loop, and also performance stuff
    if(currentHitSize < 1) currentHitSize = 1;
    let offset = {
      x: Math.cos(this.directionRad),
      y: Math.sin(this.directionRad),
    };
    //Try every hitsize px along current length
    for (let factor = 0; factor < currentLength; factor += currentHitSize) {
      //Return true if hitting the object
      if (
        dist(
          this.x + offset.x * factor, //Resolve and multiply
          this.y + offset.y * factor, //Resolve and multiply part 2
          obj.x,
          obj.y
        ) <=
        currentHitSize + obj.hitSize
      )
        return true;
    }
    //If every check failed, return false
    return false;
  }
}

class Bullet {
  x = 0;
  y = 0;
  direction = 0;
  damage = [new DamageInstance()];
  speed = 20;
  lifetime = 60;
  hitSize = 5;
  trail = true;
  trailColour = "#ffffffc4";
  remove = false;
  drawer = {
    shape: "circle",
    fill: "red",
    image: images.env.error,
    width: 10,
    height: 10,
  };
  world = null;
  entity = null;
  #trailCounter = 20;
  #trailInterval = 10;
  get directionRad(){
    return this.direction / 180 * Math.PI
  }
  init() {
    this.maxLife = this.lifetime;
    this.#trailInterval = this.hitSize * 2
  }
  step(dt) {
    this.spawnTrail(dt);
    //Not if dead
    if (!this.remove) {
      //Which way to move
      let moveVector = p5.Vector.fromAngle(this.directionRad);
      //Scale to speed
      moveVector.mult(this.speed * dt);
      //Move
      this.x += moveVector.x;
      this.y += moveVector.y;
      //Tick lifetime
      if (this.lifetime <= 0) {
        this.remove = true;
      } else {
        this.lifetime -= dt;
      }
    }
  }
  spawnTrail(dt) {
    //This got too long
    for (let e = 0; e < this.speed * dt; e++) {
      if (this.#trailCounter <= 0) {
        if (this.world?.particles != null && this.trail) {
          this.world.particles.push(
            new ShapeParticle(
              this.x - e * p5.Vector.fromAngle(this.directionRad).x,
              this.y - e * p5.Vector.fromAngle(this.directionRad).y,
              this.directionRad,
              this.maxLife * 1.2,
              0,
              0,
              "rhombus",
              this.trailColour,
              this.trailColour,
              this.hitSize * this.#trailInterval * 0.5,
              this.hitSize * this.#trailInterval * 0.5,
              this.hitSize * 1.9,
              0,
              0
            )
          );
        }
        this.#trailCounter = this.#trailInterval;
      } else {
        this.#trailCounter--;
      }
    }
  }
  draw() {
    if (this.drawer.image) {
      rotatedImg(
        this.drawer.image,
        this.x,
        this.y,
        this.drawer.width,
        this.drawer.height,
        this.direction
      );
    } else {
      //If no image, draw shape instead
      rotatedShape(
        this.drawer.shape,
        this.x,
        this.y,
        this.drawer.width,
        this.drawer.height
      );
    }
  }
  collidesWith(obj){
    return dist(this.x, this.y, obj.x, obj.y) <= this.hitSize + obj.hitSize
  }
}

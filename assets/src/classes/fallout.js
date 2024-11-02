//Fallout
class RadiationZone extends Bullet {
  damagePerTick = 0;
  damageRange = 200;
  damageType = "radiation";
  colour = [50, 255, 0, 50];
  #timer = 0;
  #outlineColour = null;
  collidesWith(obj) {
    return false; //Collides with nothing
  }
  init() {
    //No movement here
    this.speed = 0;
    let outline = this.colour.slice(0);
    outline[3] ??= 0 //Set alpha to 0 if not present
    outline[3] += 50;
    this.#outlineColour = outline;
    super.init()
  }
  draw() {
    push();
    fill(this.colour);
    stroke(this.#outlineColour);
    strokeWeight(5);
    circle(this.x, this.y, this.damageRange * 2);
    pop();
  }
  step(dt) {
    //Move with background
    this.x -= game.player.speed;
    if (this.#timer >= 20) {
      this.#timer = 0;
      //Inflict radiation damage
      splashDamageInstance(
        this.x,
        this.y,
        this.damagePerTick,
        this.damageType,
        this.damageRange,
        this.entity,
        false,
        null,
        null,
        null,
        null,
        null,
        "irradiated",
        400
      );
      this.world.particles.push(
        new WaveParticle(
          this.x,
          this.y,
          20,
          0,
          this.damageRange,
          this.#outlineColour,
          this.#outlineColour,
          20,
          0,
          true
        )
      );
    } else {
      this.#timer++;
    }
    //Despawn if fully offscreen
    if(this.x < -this.damageRange) this.remove = true;
  }
}

class Missile extends Bullet{
  target = null
  trailColour = [255, 255, 100]
  trailColourTo = [255, 0, 0]
  flameLength = 200
  trail = true
  _trailInterval = -1
  init(){
    if(this._trailInterval === -1){
      this._trailInterval = this.speed/this.hitSize;
    }
  }
  spawnTrail(dt) {
    //Visual fire effect
    for (let e = 0; e < this.speed * dt; e++) {
      if (this._trailCounter <= 0) {
        if (this.world?.particles != null && this.trail) {
          this.world.particles.push(
            new ShapeParticle(
              this.x - e * p5.Vector.fromAngle(this.directionRad).x,
              this.y - e * p5.Vector.fromAngle(this.directionRad).y,
              this.directionRad,
              this.flameLength / this.speed, //Fixed life
              0,
              0,
              "circle", //flames
              this.trailColour,
              this.trailColourTo, //Lerp colour thing
              this.hitSize * 1.9,
              0,
              this.hitSize * 1.9,
              0,
              0
            )
          );
        }
        this._trailCounter = this._trailInterval;
      } else {
        this._trailCounter--;
      }
    }
  }
}
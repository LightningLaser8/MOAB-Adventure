class GrabBullet extends PointBullet {
  reflectsProjectiles = false; //Does this work on projectiles too?
  step(dt) {
    super.step(dt);
    //If reflecting projectiles and also exists
    if (this.reflectsProjectiles && this.world) {
      //for each bullet in the same world
      for (let bullet of this.world.bullets) {
        //if the bullet is: alive, from someone else, and hitting this bullet:
        if (!this.remove && !bullet.remove && bullet.entity !== this.entity && bullet.collidesWith(this)) {
          bullet.direction += 180; //reverse direction
          bullet.entity = this.entity; //yoink bullet
          bullet.lifetime = bullet.maxLife; //reset lifetime because funny
          this.pierce --
          if(this.pierce < 0){
            this.remove = true; //kill this bullet
          }
        }
      }
    }
  }
  /** @param {Entity} entity */
  onHit(entity) {
    super.onHit(entity);
    //When an entity was hit
    //If it's a box
    if (entity instanceof Box) {
      //Delete it
      entity.dead = true;
      //Make bullet
      let bulletToMake = bullet({
        //Set up basic stuff
        type: "missile",
        trail: true,
        trailColour: this.hitColour,
        trailColourTo: this.hitColourTo,
        flameLength: 500,
        lifetime: 600,
        targetType: "mouse",
        turnSpeed: 30,
        speed: 20,
        knockback: entity.hitSize * 2,
        kineticKnockback: true,
        //Copy entity
        drawer: entity.drawer,
        direction: entity.direction,
        x: entity.x,
        y: entity.y,
        hitSize: entity.hitSize,
        //Damage and pierce
        damage: [
          {
            amount: Math.ceil(entity.maxHealth ** 0.5),
            type: "impact",
          },
        ],
        pierce: Math.ceil(entity.health ** 0.5),
        multiHit: true,
      });
      bulletToMake.entity = this.entity;
      bulletToMake.world = entity.world;
      entity.world.bullets.push(bulletToMake);
    }
  }
  hitEffect() {
    //Override hit effect
    this.world.particles.push(
      //Create hit effect
      new WaveParticle(
        this.x,
        this.y,
        30,
        0,
        200,
        this.hitColour,
        this.hitColourTo,
        0,
        60,
        true
      )
    );
  }
  createTrailTo(x, y) {} //No trail
}

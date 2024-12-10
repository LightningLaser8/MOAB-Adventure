class GrabBullet extends PointBullet{
  /** @param {Entity} entity */
  onHit(entity){ //When an entity was hit
    //If it's a box
    if(entity instanceof Box){
      //Delete it
      entity.dead = true;
      //Make bullet
      let bulletToMake = bullet({
        //Set up basic stuff
        type: "missile",
        trail: true,
        trailColour: [255, 255, 255, 50],
        trailColourTo: [0, 255, 255, 0],
        flameLength: 500,
        lifetime: 600,
        targetType: "mouse",
        turnSpeed: 30,
        speed: 20,
        knockback: entity.hitSize*2,
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
            type: "impact"
          }
        ],
        pierce: Math.ceil(entity.health ** 0.5),
        multiHit: true
      })
      bulletToMake.entity = this.entity;
      bulletToMake.world = entity.world;
      entity.world.bullets.push(bulletToMake)
    }
  }
  hitEffect(){ //Override hit effect
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
  createTrailTo(x, y){} //No trail
}
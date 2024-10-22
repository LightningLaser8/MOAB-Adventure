class Weapon {
  entity = null; //will be the player, unless it's a boss weapon - DON'T PRE-SET THIS
  reload = 30;
  barrel = 0;
  parts = [];
  shoot = {
    bullet: null,
    pattern: {
      spread: 0,
      amount: 1,
      spacing: 0,
    },
  };
  //Upgrade info
  cost = {
    shards: 0,
    bloonstones: 0
  }
  slot = null
  name = "Name goes here"
  description = "Description goes here"
  /**Rotation in degrees */
  rotation = 0;
  //Internal
  #delay = 0;
  #cooldown = 0;
  constructor() {}
  get rotationRadians() {
    return (this.rotation / 180) * Math.PI;
  }
  init() {
    let np = [];
    for (let p of this.parts) {
      np.push(construct(p));
    }
    this.parts = np;
  }
  draw() {
    for (let p of this.parts) {
      p.draw ? p.draw(this) : {};
    }
  }
  tick() {
    if (!this.slot) return;
    if (this.slot.entity) {
      this.x = this.slot.entity.x + this.slot.posX;
      this.y = this.slot.entity.y + this.slot.posY;
      this.rotation = degrees(
        p5.Vector.sub(
          createVector(this.slot.entity.target.x, this.slot.entity.target.y), //Mouse pos 'B'
          createVector(this.x, this.y) //Weapon pos 'A'
        ).heading() //'A->B' = 'B' - 'A'
      );
    }
    if(this.#cooldown > 0){
      this.#cooldown --
    }
    this.parts.forEach(x => x.tick()) //Tick all parts
  }
  fire() {
    if (this.#cooldown <= 0) {
      this.#cooldown = this.reload;
      //Resolve nonexistent properties
      this.shoot.pattern.spread ??= 0;
      this.shoot.pattern.amount ??= 1;
      this.shoot.pattern.spacing ??= 0;

      patternedBulletExpulsion(this.x, this.y, this.shoot.bullet, this.shoot.pattern.amount, this.rotation, this.shoot.pattern.spread, this.shoot.pattern.spacing, this.slot.entity.world, this.slot.entity)
      this.parts.forEach(x => x.fire()) //Tick all parts
    }
  }
}

function patternedBulletExpulsion(x, y, bulletToSpawn, amount, direction, spread, spacing, world, entity){
  //Derives most of its code from `Weapon.fire()`  
  //universal mode: a c t i v a t e
  //Max difference in direction
  let diff =
    (spacing * (amount - 1)) / 2;
  //Current angle
  let currentAngle = -diff;
  //For each bullet to fire
  for (let index = 0; index < amount; index++) {
    /** @type {Bullet} */
    let bulletToFire = bullet(bulletToSpawn);
    //Put the bullet in position
    bulletToFire.x = x;
    bulletToFire.y = y;
    bulletToFire.direction = direction; //do the offset
    //Apply uniform spread
    bulletToFire.direction += currentAngle;
    currentAngle += spacing;
    //Apply random spread
    bulletToFire.direction += random(
      spread,
      -spread
    );
    //Add entity and world
    bulletToFire.entity = entity;
    bulletToFire.world = world;
    //Spawn it in
    world.bullets.push(bulletToFire);
  }
}
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
  }
  fire() {
    if (this.#cooldown <= 0) {
      this.#cooldown = this.reload;
      //Resolve nonexistent properties
      this.shoot.pattern.spread ??= 0;
      this.shoot.pattern.amount ??= 1;
      this.shoot.pattern.spacing ??= 0;

      const world = this.slot.entity.world;
      //Max difference in direction
      let diff =
        (this.shoot.pattern.spacing * (this.shoot.pattern.amount - 1)) / 2;
      //Current angle
      let currentAngle = -diff;
      //For each bullet to fire
      for (let index = 0; index < this.shoot.pattern.amount; index++) {
        /** @type {Bullet} */
        let bulletToFire = bullet(this.shoot.bullet);
        //Put the bullet on the gun
        bulletToFire.x = this.x;
        bulletToFire.y = this.y;
        bulletToFire.direction = this.rotation;
        //Apply uniform spread
        bulletToFire.direction += currentAngle;
        currentAngle += this.shoot.pattern.spacing;
        //Apply random spread
        bulletToFire.direction += random(
          this.shoot.pattern.spread,
          -this.shoot.pattern.spread
        );
        bulletToFire.step(1);
        //Add entity and world
        bulletToFire.entity = this.slot.entity;
        bulletToFire.world = world;
        //Spawn it in
        world.bullets.push(bulletToFire);
      }
    }
  }
}

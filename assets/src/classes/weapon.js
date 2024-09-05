class Weapon {
  meta = {
    //Metadata - mostly edited by the game itself, not the programmer
    entity: null, //will be the player, unless it's a boss weapon - DON'T PRE-SET THIS
    source: "custom", //Source
    posX: 0, //X on player
    posY: 0, //Y on player
  };
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
    if (this.meta.entity) {
      this.x = this.meta.entity.x + this.meta.posX;
      this.y = this.meta.entity.y + this.meta.posY;
      this.rotation = degrees(
        p5.Vector.sub(
          createVector(this.meta.entity.target.x, this.meta.entity.target.y), //Mouse pos 'B'
          createVector(this.x, this.y) //Weapon pos 'A'
        ).heading() //'A->B' = 'B' - 'A'
      );
    }
  }
  fire() {
    //Resolve nonexistent properties
    this.shoot.pattern.spread ??= 0
    this.shoot.pattern.amount ??= 1
    this.shoot.pattern.spacing ??= 0

    const world = this.meta.entity.world;
    //Max difference in direction
    let diff = (this.shoot.pattern.spacing * (this.shoot.pattern.amount - 1)) / 2;
    //Current angle
    let currentAngle = -diff;
    //For each bullet to fire
    for (let index = 0; index < this.shoot.pattern.amount; index++) {
      /** @type {Bullet} */
      let bulletToFire = construct(this.shoot.bullet);
      //Put the bullet on the gun
      bulletToFire.x = this.x;
      bulletToFire.y = this.y;
      bulletToFire.direction = this.rotation;
      //Apply uniform spread
      bulletToFire.direction += currentAngle;
      currentAngle += this.shoot.pattern.spacing
      //Apply random spread
      bulletToFire.direction += random(
        this.shoot.pattern.spread,
        -this.shoot.pattern.spread
      );
      bulletToFire.step(1)
      //Add entity and world
      bulletToFire.entity = this.meta.entity
      bulletToFire.world = world
      //Spawn it in
      world.bullets.push(bulletToFire)
    }
  }
}

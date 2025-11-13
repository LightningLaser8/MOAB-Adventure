class MultiWeapon extends Weapon {
  weapons = [];
  init() {
    //Construct partial weapons
    this.weapons = this.weapons.map((x) => weapon(x, PartialWeapon));
    //Set source entity for damage
    let index = 0; //Set identifiers
    this.weapons.forEach((x) => {
      x.parent = this;
      x.index = index;
      index++;
    });
    this.weapons.forEach((x) => {
      x.total = index - 1;
    }); //Set number of weapons
  }
  tick() {
    for (let weapon of this.weapons) {
      weapon.tick();
    }
    this.rotation = this.weapons[0]?.rotation ?? 0; //Set rotation to first weapon
  }
  draw() {
    for (let weapon of this.weapons) {
      weapon.draw();
    }
  }
  fire() {
    for (let weapon of this.weapons) {
      if (!weapon.isAuto) weapon.fire();
    }
  }
}

class PartialWeapon extends Weapon {
  parent = null;
  offset = 0;
  index = 0;
  total = 1;
  isAuto = false; //Will this weapon fire automatically every tick?
  range = Infinity;
  getDVScale() {
    return this.parent.slot.entity.dv * this.dvRatio;
  }
  tick() {
    let target = this.parent.slot.entity.target;
    if (this.isAuto) {
      let minDist = Infinity;
      for (let entity of this.parent.slot.entity.world.entities) { //big accessor chain
        let chkdist = dist(this.x, this.y, entity.x, entity.y); // Calculate distance to potential target
        if (
          !entity.dead && //If not dead
          chkdist < minDist && //If closer
          chkdist < this.range && //If in range
          entity.team !== this.parent.slot.entity.team //Don't target the same team
        ) {
          //Target the entity
          minDist = chkdist;
          target = entity;
        }
      }
      if(minDist < Infinity){
        this.fire()
      }
    }
    if (this.parent.slot.entity) {
      this.x =
        this.parent.slot.entity.x +
        this.parent.slot.posX +
        this.offset *
          Math.cos(frameCount / 60 + ((Math.PI * 2) / this.total) * this.index);
      this.y =
        this.parent.slot.entity.y +
        this.parent.slot.posY +
        this.offset *
          Math.sin(frameCount / 60 + ((Math.PI * 2) / this.total) * this.index);
      this.rotation = degrees(
        p5.Vector.sub(
          createVector(target.x, target.y), //Mouse pos 'B'
          createVector(this.x, this.y) //Weapon pos 'A'
        ).heading() //'A->B' = 'B' - 'A'
      );
    }
    this.decelerate();
    if (this._cooldown > 0) {
      this._cooldown--;
    }
    this.parts.forEach((x) => x.tick()); //Tick all parts
  }
  fire() {
    if (this._cooldown <= 0) {
      SoundCTX.play(this.fireSound);
      this._cooldown = this.getAcceleratedReloadRate();
      this.accelerate(); //Apply acceleration effects
      //Resolve nonexistent properties
      this.shoot.pattern.spread ??= 0;
      this.shoot.pattern.amount ??= 1;
      this.shoot.pattern.spacing ??= 0;

      patternedBulletExpulsion(
        this.x,
        this.y,
        this.shoot.bullet,
        this.shoot.pattern.amount,
        this.rotation,
        this.shoot.pattern.spread,
        this.shoot.pattern.spacing,
        this.parent.slot.entity.world,
        this.parent.slot.entity,
        this
      );
      this.parts.forEach((x) => x.fire()); //Tick all parts
    }
  }
}

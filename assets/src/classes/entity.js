class Entity {
  x = 0;
  y = 0;
  direction = 0;
  //Slots only for players
  weaponSlots = [];
  health = 100;
  maxHealth = 100;
  name = "Entity";
  world = null;
  resistances = [];
  //How the entity will be drawn
  drawer = {
    shape: "circle",
    fill: "red",
    image: images.env.error,
    width: 100,
    height: 100,
  };
  hitSize = 100;
  speed = 10;
  team = "enemy";
  target = { x: 0, y: 0 };

  //Stats
  damageDealt = 0;
  damageTaken = 0;
  destroyed = {
    boxes: 0,
    bosses: 0,
  };

  //Status effects
  effectiveDamageMult = 1;
  effectiveHealthMult = 1;
  effectiveResistanceMult = 1;
  effectiveSpeedMult = 1;

  constructor() {} //Because universal
  init() {
    this.maxHealth = this.health; //Stop part-damaged entities spawning
  }
  addToWorld(world) {
    world.entities.push(this);
    this.world = world;
  }
  damage(type = "normal", amount = 0, source = null) {
    let calcAmount =
      (amount / this.effectiveHealthMult) * (source?.effectiveDamageMult ?? 1); //Get damage multiplier of source, if there is one
    for (let resistance of this.resistances) {
      if (resistance.type === type) {
        calcAmount -= amount * resistance.amount; //Negative resistance would actually make it do more damage
      }
    }
    this.takeDamage(Math.max(calcAmount, 0), source); //Take the damage, but never take negative damage
  }
  knock(amount = 0, direction = -this.direction) {
    this.x += amount * Math.cos(radians(direction)); //Knock in the direction of impact
    this.y += amount * Math.sin(radians(direction));
  }
  takeDamage(amount = 0, source = null) {
    this.damageTaken += Math.min(amount, this.health) * this.effectiveHealthMult;
    if (source) source.damageDealt += Math.min(amount, this.health) * this.effectiveHealthMult; //Stats pretend health was higher
    this.health -= amount;
    if (this.health <= 0) {
      this.health = 0;
      this.dead = true;
    }
  }
  addWeaponSlot(slot) {
    this.weaponSlots.push(slot);
    slot.entity = this;
  }
  tick() {
    //Tick weapons
    // for (let weapon of this.weapons) {
    //   weapon.tick();
    // }
    for (let slot of this.weaponSlots) {
      slot.tick();
    }
    this.checkBullets();
  }
  getClosestEnemy() {
    /*Don't actually need this yet*/
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
    //Draw weapons on top
    // for (let weapon of this.weapons) {
    //   weapon.draw();
    // }
    for (let slot of this.weaponSlots) {
      slot.draw();
    }
  }
  collidesWith(obj) {
    //No collisions if dead
    return (
      !this.dead &&
      dist(this.x, this.y, obj.x, obj.y) <= this.hitSize + obj.hitSize
    );
  }
  checkBullets() {
    for (let bullet of this.world.bullets) {
      //If colliding with a bullet on different team, that it hasn't already been hit by and that still exists
      if (
        !bullet.remove &&
        this.team !== bullet.entity.team &&
        this.collidesWith(bullet) &&
        !bullet.damaged.includes(this)
      ) {
        //Take all damage instances
        for (let instance of bullet.damage) {
          if (instance.area)
            //If it explodes
            splashDamageInstance(
              bullet.x,
              bullet.y,
              instance.amount,
              instance.type,
              instance.area,
              bullet.entity,
              instance.visual, //        \
              instance.sparkColour, //   |
              instance.sparkColourTo, // |
              instance.smokeColour, //   |- These are optional, but can be set per instance
              instance.smokeColourTo, // |
              instance.waveColour //     /
            );
          else this.damage(instance.type, instance.amount, bullet.entity);
        }
        this.knock(bullet.knockback, bullet.direction);
        if(bullet.status !== "none"){
          this.applyStatus(bullet.status, bullet.statusDuration);
        }
        //Make the bullet know
        bullet.damaged.push(this);
        //Reduce pierce
        bullet.pierce--;
        //If exhausted
        if (bullet.pierce < 0) {
          //Delete
          bullet.remove = true;
        }
      }
    }
  }
  tickStatuses() {
    this.effectiveSpeedMult =
      this.effectiveDamageMult =
      this.effectiveHealthMult =
      this.effectiveResistanceMult =
        1;
    for (let status of this.statuses) {
      let effect = Registry.statuses.get(status.effect);
      this.damage(effect.damage, effect.damageType);
      this.heal(effect.healing);
      this.effectiveSpeedMult *= effect.speedMult ?? 1;
      this.effectiveDamageMult *= effect.damageMult ?? 1;
      this.effectiveHealthMult *= effect.healthMult ?? 1;
      this.effectiveResistanceMult *= effect.resistanceMult ?? 1;
    }
  }
  applyStatus(effect, time) {
    this.statuses.push({ effect: effect, time: time, timeLeft: time });
  }
}

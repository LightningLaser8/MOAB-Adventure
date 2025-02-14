class Entity {
  x = 0;
  y = 0;
  direction = 0;
  //Slots only for players
  weaponSlots = [];
  health = 100;
  maxHealth = 100;
  name = "Entity";
  /**@type {World} */
  world = null;
  resistances = [];
  //How the entity will be drawn
  drawer = {
    shape: "circle",
    fill: "red",
    image: "error",
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
  lastHurtSource = null;

  //Status effects
  effectiveDamageMult = 1;
  effectiveHealthMult = 1;
  effectiveResistanceMult = 1;
  effectiveSpeedMult = 1;
  statuses = [];

  //Sounds
  hitSound = null;
  deathSound = null;
  //Movement
  turnSpeed = 1;
  turnWhileMoving = false;
  trackTarget = true;
  trackingOffsetX = 0;
  trackingOffsetY = 0;
  previousRot = 0;

  get directionRad() {
    return (this.direction / 180) * Math.PI;
  }

  constructor() {} //Because universal
  upgrade(blimp) {
    construct(Registry.blimps.get(blimp), Blimp).upgradeEntity(this);
  }
  init() {
    this.scaleToDifficulty();
    this.maxHealth = this.health; //Stop part-damaged entities spawning
    /**@type {Array<WeaponSlot>} */
    let madeSlots = this.weaponSlots.map((x) => construct(x, WeaponSlot)); //Create weapon slots
    this.weaponSlots = [];
    madeSlots.forEach((x) => {
      this.addWeaponSlot(x);
      let t = x.tier;
      x.tier = 0;
      for (let i = 0; i < t; i++) {
        x.attemptUpgrade();
      }
    });
  }
  addToWorld(world) {
    world.entities.push(this);
    this.world = world;
    return this;
  }
  damage(type = "normal", amount = 0, source = null) {
    if(source) this.lastHurtSource = source;
    let calcAmount =
      (amount / this.effectiveHealthMult) * (source?.effectiveDamageMult ?? 1); //Get damage multiplier of source, if there is one
    for (let resistance of this.resistances) {
      if (resistance.type === type) {
        calcAmount -= amount * resistance.amount; //Negative resistance would actually make it do more damage
      }
    }
    this.takeDamage(Math.max(calcAmount, 0), source); //Take the damage, but never take negative damage
  }
  heal(amount) {
    this.health += amount;
    if (this.health > this.maxHealth) {
      this.health = this.maxHealth;
    }
  }
  knock(
    amount = 0,
    direction = -this.direction,
    kineticKnockback = false,
    resolution = 1,
    collided = []
  ) {
    if (resolution < 0) resolution *= -1; //Fix possilility of infinite loop
    if (resolution == 0) resolution = 1;
    //so sin and cos only happen once
    let ymove = Math.sin(radians(direction));
    let xmove = Math.cos(radians(direction));
    if (!kineticKnockback) {
      this.x += amount * xmove; //Knock in the direction of impact
      this.y += amount * ymove;
    } else {
      let hit = false; //Has the entity hit anything?
      for (let iteration = 0; iteration < amount; iteration += resolution) {
        //For every entity this one could possibly collide with
        for (let entity of this.world.entities) {
          if (
            //If a valid collision
            entity !== this &&
            !entity.dead &&
            this.team === entity.team &&
            !collided.includes(entity) && //Not if already hit
            this.collidesWith(entity)
          ) {
            //It's hit something!
            hit = true;
            collided.push(entity);

            //Move back to stop infinite loop
            this.x -= resolution * xmove; //Knock in the direction of impact
            this.y -= resolution * ymove;

            //Propagate knockback
            entity.knock(
              amount * 0.75 /* exponential decay */,
              direction,
              true,
              resolution,
              collided
            ); //Pass on collided entities to prevent infinite loop
          }
        }
        //If hit, stop moving
        if (hit) break;
        else {
          //If not hit, move
          this.x += resolution * xmove; //Knock in the direction of impact
          this.y += resolution * ymove;
        }
      }
    }
  }
  takeDamage(amount = 0, source = null) {
    this.damageTaken +=
      Math.min(amount, this.health) * this.effectiveHealthMult;
    if (source)
      source.damageDealt +=
        Math.min(amount, this.health) * this.effectiveHealthMult; //Stats pretend health was higher
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
    for (let slot of this.weaponSlots) {
      slot.tick();
    }
    this.checkBullets();
    this.tickStatuses();
    this.ai();
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
        this.directionRad
      );
    } else {
      //If no image, draw shape instead
      rotatedShape(
        this.drawer.shape,
        this.x,
        this.y,
        this.drawer.width,
        this.drawer.height,
        this.directionRad
      );
    }
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
        !bullet.damaged.includes(this) &&
        bullet.collidesWith(this) //check collisions last for performance reasons
      ) {
        //Take all damage instances
        for (let instance of bullet.damage) {
          if (!instance.area)
            this.damage(
              instance.type,
              (instance.amount +
                (bullet.source ? bullet.source.getDVScale() : 0) +
                (instance.levelScaling ?? 0) * game.level) *
                //If boss, multiply damage by boss damage multiplier, if present, or else 1. If not boss, multiply by 1.
                (this instanceof Boss ? instance.bossDamageMultiplier ?? 1 : 1),
              bullet.entity
            ); //Wait if kaboom
          this.maxHealth -= instance.amount * bullet.maxHPReductionFactor;
        }
        if (bullet.controlledKnockback) {
          //Get direction to the target
          let direction = degrees(
            p5.Vector.sub(
              createVector(bullet.entity.target.x, bullet.entity.target.y), //Target pos 'B'
              createVector(bullet.x, bullet.y) //Bullet pos 'A'
            ).heading() //'A->B' = 'B' - 'A'
          );
          this.knock(bullet.knockback, direction, bullet.kineticKnockback); //Knock with default resolution
        } else {
          this.knock(
            bullet.knockback,
            bullet.direction,
            bullet.kineticKnockback
          ); //Knock with default resolution
        }
        if (bullet.status !== "none") {
          this.applyStatus(bullet.status, bullet.statusDuration);
        }
        //Make the bullet know
        bullet.damaged.push(this);
        bullet.onHit(this);
        playSound(this.hitSound);
        playSound(bullet.hitSound);
        //Reduce pierce
        bullet.pierce--;
        //If exhausted
        if (bullet.pierce < 0) {
          if (bullet instanceof LaserBullet) bullet.canHurt = false;
          else bullet.remove = true; //Delete
        }
        //Check death
        if (this.dead) {
          if (bullet.source) {
            if (bullet.source.storesDV) bullet.source.absorbDVFrom(this); //Add the DV
          }
        }
      } else {
        if (
          !bullet.remove &&
          this.team !== bullet.entity.team &&
          bullet.damaged.includes(this)
        ) {
          if (bullet.multiHit && !bullet.collidesWith(this)) {
            //Unpierce it
            bullet.damaged.splice(bullet.damaged.indexOf(this), 1);
          }
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
      this.damage(effect.damageType, effect.damage);
      this.heal(effect.healing);
      this.effectiveSpeedMult *= effect.speedMult ?? 1;
      this.effectiveDamageMult *= effect.damageMult ?? 1;
      this.effectiveHealthMult *= effect.healthMult ?? 1;
      this.effectiveResistanceMult *= effect.resistanceMult ?? 1;
      if (status.timeLeft > 0) status.timeLeft--; //Tick timer
      else this.statuses.splice(this.statuses.indexOf(status), 1); //Delete status
    }
  }
  applyStatus(effect, time) {
    this.statuses.push({ effect: effect, time: time, timeLeft: time });
  }
  scaleToDifficulty() {
    //Do nothing, as it doesn't matter for normal entities
  }
  onDeath(){}
  rotateTowards(x, y, amount) {
    let done = false;
    let maxRotateAmount = radians(amount); //use p5 to get radians
    let delta = { x: x - this.x, y: y - this.y };
    //Define variables
    let currentDirection = p5.Vector.fromAngle(this.directionRad).heading(); //Find current angle, standardised
    let targetDirection = Math.atan2(delta.y, delta.x); //Find target angle, standardised
    if (targetDirection === currentDirection) return; //Do nothing if facing the right way
    let deltaRot = targetDirection - currentDirection;
    //Rotation correction
    if (deltaRot < -PI) {
      deltaRot += TWO_PI;
    } else if (deltaRot > PI) {
      deltaRot -= TWO_PI;
    }
    let sign = deltaRot < 0 ? -1 : 1; //Get sign: -1 if negative, 1 if positive
    let deltaD = 0;
    //Choose smaller turn
    if (Math.abs(deltaRot) > maxRotateAmount) {
      deltaD = maxRotateAmount * sign;
      done = true; //Done turning
    } else {
      deltaD = deltaRot;
      done = false;
    }
    //Turn
    this.direction += degrees(deltaD);
    return done; // Tell caller its done
  }
  moveTowards(x, y, rotate = false) {
    if (!rotate) {
      let oldRot = this.direction;
      this.direction = this.previousRot;
      this.rotateTowards(x, y, this.turnSpeed);
      this.x += this.speed * Math.cos(radians(this.direction)); //Move in x-direction
      this.y += this.speed * Math.sin(radians(this.direction)); // Move in y-direction
      this.previousRot = this.direction;
      this.direction = oldRot;
      return true;
    } else {
      let done = this.rotateTowards(x, y, this.turnSpeed);
      this.x += this.speed * Math.cos(radians(this.direction)); //Move in x-direction
      this.y += this.speed * Math.sin(radians(this.direction)); // Move in y-direction
      return done;
    }
  }
  /** Moves and optionally rotates towards a point. */
  trackPoint(x, y) {
    if (this.target)
      if (
        this.moveTowards(
          x,
          y,
          this.turnWhileMoving && !(x === this.target.x || y === this.target.y)
        )
      )
        if (this.turnWhileMoving)
          /*If done moving*/
          // and target exists
          this.rotateTowards(this.target.x, this.target.y, this.turnSpeed); //turn towards it.
  }
  ai() {
    //Do nothing by default
  }
}

//Entity that scales health as the game's level increases.
class ScalingEntity extends Entity {
  //Amount of extra health per game level.
  healthIncrease = 0;
  init() {
    this.health += this.healthIncrease * (game.level - 1 ?? 0); //Level 1 is +0 HP
    super.init(); //Make sure to do this part AFTER
  }
}

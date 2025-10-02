// WORM BROKE
class SegmentedEntity extends Entity {
  segmentType = {};
  segmentCount = 1;
  segments = [];
  maxSegmentSpacing = 50;
  segmentWeaponSpacing = 1; //segments between segments with weapons
  init() {
    super.init();
    this.segments = [];
    let spaces = this.segmentWeaponSpacing;
    for (let i = 0; i < this.segmentCount; i++) {
      /**
       * @type {Segment}
       */
      let segment = construct(this.segmentType, Segment);
      segment.x = this.x;
      segment.y = this.y;
      segment.target = this;
      segment.speed = this.speed;
      segment.turnSpeed = this.turnSpeed;
      segment.head = this;
      segment.index = i;
      segment.team = this.team;
      segment.resistances = this.resistances.slice(0);
      segment.turnWhileMoving = this.turnWhileMoving;
      if (spaces === 0) {
        spaces = this.segmentWeaponSpacing;
      } else {
        spaces--;
        segment.weaponSlots = [];
      }
      segment.tooFarThreshold = this.maxSegmentSpacing;
      this.segments[i] = segment;
    }
  }
  addToWorld(world) {
    this.segments.forEach((segment) => {
      segment.addToWorld(world);
    });
    super.addToWorld(world);
  }
  draw() {
    let d = this.direction;
    this.direction = this.segments.at(-1).direction ?? d;
    super.draw();
    this.direction = d;
  }
  //knockback immunity
  knock() {}
  ai() {
    //Temporarily, set target to player. This should almost always be the case, until player minions exist.
    this.target = game?.player;

    //Move towards tracking point
    if (this.trackTarget)
      if (this.target)
        this.trackPoint(
          this.target.x + this.trackingOffsetX,
          this.target.y + this.trackingOffsetY
        );

    //Fire weapons
    this.weaponSlots.forEach((slot) => {
      slot.weapon?.fire();
    });
    //Fire segment weapons
    this.segments.forEach((segment) => {
      segment?.weaponSlots.forEach((slot) => {
        slot.weapon?.fire();
      });
    });
  }
}

class Segment extends Entity {
  head = null;
  index = 0;
  tooFarThreshold = 0;
  tick() {
    //kill self if head is dead or missing
    if (!this.head || this.head.dead) {
      this.dead = true;
    }

    this.checkBullets();
    this.tickStatuses();
    this.ai();
  }
  damage(type, amount, source) {
    //damage head instead of segment
    if (this.head) this.head.damage(type, amount, source);
  }
  takeDamage(amount, source) {
    //head takes damage instead of segment
    if (this.head) this.head.takeDamage(amount, source);
  }
  //knockback immunity
  knock() {}
  ai() {
    //store next segment or head
    let t = this.head.segments[this.index + 1] || this.head;
    if (t === this) t = this.head.segments[this.index + 2];
    //shoot at head's target
    this.target = this.head.target;
    for (let slot of this.weaponSlots) {
      slot.tick();
    }
    //Move towards next segment
    this.target = t;
    if (t) {
      this.trackPoint(t.x, t.y);

      if (dist(this.x, this.y, t.x, t.y) > this.tooFarThreshold) {
        this.x = t.x;
        this.y = t.y;
      }
    } else this.dead = true;
  }
}

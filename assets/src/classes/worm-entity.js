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
      //track exact center of head
      segment.trackingOffsetX = 0;
      segment.trackingOffsetY = 0;
      segment.tooFarThreshold = this.maxSegmentSpacing;
      this.segments.push(segment);
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
      segment.weaponSlots.forEach((slot) => {
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
    if (!this.head || this.head.dead) this.dead = true;
    //retarget next segment along, or head if no next segment
    this.target = this.head.segments[this.index + 1] || this.head;

    this.checkBullets();
    this.tickStatuses();
    if (!this.target) return;
    //shoot at head's target
    let t = this.target;
    this.target = this.head.target;
    for (let slot of this.weaponSlots) {
      slot.tick();
    }
    this.target = t;
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
    //Move towards tracking point
    if (this.target)
      this.trackPoint(
        this.target.x + this.trackingOffsetX,
        this.target.y + this.trackingOffsetY
      );
  }
}

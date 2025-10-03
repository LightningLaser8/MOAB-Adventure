class Boss extends ScalingEntity {
  reward = { shards: 0, bloonstones: 0 };
  /** @type {Array<BossAction>} */
  actions = {}; //Essentially a registry, holds items to be used in sequence
  sequence = []; //Array of names of actions.
  imposSequence = null; //Array to be used in Impossible difficulty. Optional.
  #action = 0; //Current action being executed
  #timer = 0; //Time the current action has been executing for.

  imposDrawer = null;

  //Movement
  aiActive = true;
  turnSpeed = 5;
  turnWhileMoving = false;
  trackTarget = true;
  trackingOffsetX = 400;
  trackingOffsetY = 0;
  previousRot = 0;

  isMinion = false; //Stops this counting for boss kills
  dv = 250;
  init() {
    super.init();
    //Construct boss actions
    for (let name in this.actions) {
      this.actions[name] = construct(this.actions[name], BossAction);
    }
    //Instantly use first action
    let currentAction = this.getAction();
    if (currentAction) currentAction.execute(this);
    this.previousRot = this.direction;
  }
  seq() {
    return game.difficulty === "impossible"
      ? this.imposSequence ?? this.sequence
      : this.sequence;
  }
  getAction() {
    return this.actions[this.seq()[this.#action]];
  }
  tickSeq(seq, actIndex) {
    //Do the action thing
    /**@type {BossAction} */
    let currentAction = this.actions[seq[actIndex]];
    if (!currentAction) return 0; //Stop immediately if actions empty
    if (!currentAction.complete) {
      currentAction.tick(this);
      return actIndex;
    }
    //If action has finished
    currentAction.end(this);
    actIndex++;
    if (actIndex >= seq.length) {
      actIndex = 0;
    }
    let next = this.actions[seq[actIndex]];
    if (!next) return actIndex; //Stop if the only action has been done
    next.execute(this);
    if (next.duration === 1 && actIndex !== 0) {
      this.tickSeq(seq, actIndex); //skip through, unless all actions are 0 duration to avoid freezing
    }
    return actIndex;
  }
  tick() {
    if (!this.#action) this.#action = 0;
    //Tick as normal
    super.tick();
    if (this.aiActive) {
      //Temporarily, set target to player. This should almost always be the case, until player minions exist.
      this.target = game?.player;
      //Move towards tracking point
      if (this.trackTarget)
        if (this.target)
          this.trackPoint(
            this.target.x + this.trackingOffsetX,
            this.target.y + this.trackingOffsetY
          );
    }
    this.#action = this.tickSeq(this.seq(), this.#action);
    //Corrective rotating
    this.direction = degrees(p5.Vector.fromAngle(this.directionRad).heading());
  }
  scaleToDifficulty() {
    let diff = Registry.difficulties.get(game.difficulty); //Get difficulty
    this.health *= diff.bossHP ?? 1; //Multiply HP by boss HP multiplier
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
  onDeath(source) {
    game.level++;
    //Save progress
    saveGame();
    //Give destroy reward
    game.shards += this.reward.shards ??= 0;
    game.bloonstones += this.reward.bloonstones ??= 0;
    if (!source) return;
    //Stats
    if (!this.isMinion) source.destroyed.bosses++;
  }
  getDraw() {
    return game.difficulty === "impossible"
      ? this.imposDrawer ?? this.drawer
      : this.drawer;
  }
  draw() {
    let d = this.getDraw();
    if (d.image) {
      rotatedImg(d.image, this.x, this.y, d.width, d.height, this.directionRad);
    } else {
      //If no image, draw shape instead
      rotatedShape(
        d.shape,
        this.x,
        this.y,
        d.width,
        d.height,
        this.directionRad
      );
    }
    for (let slot of this.weaponSlots) {
      slot.draw();
    }
  }
}

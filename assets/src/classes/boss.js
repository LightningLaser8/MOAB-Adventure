class Boss extends ScalingEntity {
  reward = { shards: 0, bloonstones: 0 };
  /** @type {Array<BossAction>} */
  actions = {}; //Essentially a registry, holds items to be used in sequence
  sequence = []; //Array of names of actions
  #action = 0; //Current action being executed
  #timer = 0; //Time the current action has been executing for.

  //Much like the boxes' version
  takeDamage(amount = 0, source = null) {
    super.takeDamage(amount, source);
    if (this.dead && !this.rewarded) {
      //Give destroy reward
      game.shards += this.reward.shards ??= 0;
      game.bloonstones += this.reward.bloonstones ??= 0;
      this.rewarded = true;
      if (!source) return;
      //Stats
      source.destroyed.bosses++;
    }
  }
  init() {
    super.init();
    //Construct boss actions
    for (let name in this.actions) {
      this.actions[name] = construct(this.actions[name], BossAction);
    }
    //Instantly use first action
    let currentAction = this.actions[this.sequence[this.#action]];
    if (!currentAction) return; //Stop immediately if actions empty
    currentAction.execute(this);
    this.previousRot = this.direction;
  }
  scaleToDifficulty() {
    let diff = difficulty[game.difficulty]; //Get difficulty
    this.health *= diff.bossHP ?? 1; //Multiply HP by boss HP multiplier
  }
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

    //Do the action thing
    let currentAction = this.actions[this.sequence[this.#action]];
    if (!currentAction) return; //Stop immediately if actions empty
    if (this.#timer < currentAction.duration) {
      currentAction.tick(this);
      this.#timer++;
    } else {
      this.#action++;
      this.#timer = 0;
      if (this.#action >= this.sequence.length) {
        this.#action = 0;
      }
      let next = this.actions[this.sequence[this.#action]];
      if (!next) return; //Stop if only action has been done
      next.execute(this);
      next.tick(this);
    }
  }
}

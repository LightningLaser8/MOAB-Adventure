class Box extends ScalingEntity {
  //Default box, for undefined world spawning entity
  static get default() {
    return Registry.entities.get("wooden-box");
  }
  //Basic metal box
  static get metal() {
    return Registry.entities.get("metal-box");
  }
  //Rewards
  reward = { bloonstones: 0, shards: 0 };
  destroyReward = structuredClone(this.reward);
  //No moving unless explicitly stated
  speed = 0;
  takeDamage(amount = 0, source = null) {
    super.takeDamage(amount, source);
    if (this.dead) {
      //Give destroy reward
      game.shards += this.destroyReward.shards ??= 0;
      game.bloonstones += this.destroyReward.bloonstones ??= 0;
      if (!source) return;
      source.destroyed.boxes++;
    }
  }
  tick() {
    if (!this.dead) {
      //Move
      this.x -= game.player.speed + this.speed;
      if (this.x < -this.hitSize) {
        this.dead = true;
        //Give basic reward
        game.shards += this.reward.shards ??= 0;
        game.bloonstones += this.reward.bloonstones ??= 0;
      }
      super.tick();
    }
  }
  scaleToDifficulty() {
    let diff = difficulty[game.difficulty]; //Get difficulty
    this.health *= diff.boxHP ?? 1; //Multiply HP by box HP multiplier
  }
}

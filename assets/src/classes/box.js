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
  square = true; //Can't rotate
  onDeath(source) {
    //Give destroy reward
    game.shards += this.destroyReward.shards ??= 0;
    game.bloonstones += this.destroyReward.bloonstones ??= 0;
    if (!source) return;
    source.destroyed.boxes++;
  }
  tick() {
    if (!this.dead) {
      //Move
      this.x -= game.player.speed + this.speed;
      if (this.x < -this.hitSize) {
        this.dead = true;
        this.left = true;
        //Give basic reward
        game.shards += this.reward.shards ??= 0;
        game.bloonstones += this.reward.bloonstones ??= 0;
      }
      if (this.square) this.direction = 0;
      super.tick();
    }
  }
  scaleToDifficulty() {
    let diff = difficulty[game.difficulty]; //Get difficulty
    this.health *= diff.boxHP ?? 1; //Multiply HP by box HP multiplier
  }
}
class AngryBox extends Box {
  tick() {
    super.tick();
    if (!this.dead) {
      this.target = game?.player;
      this.weaponSlots.forEach((s) => {
        if (s?.weapon) s.weapon.fire();
      });
    }
  }
}

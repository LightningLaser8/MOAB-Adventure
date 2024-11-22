class Boss extends Entity {
  //Actually a boss now
  static box = {
    type: this.name,
    name: "Gigantic Box",
    drawer: {
      image: "box.wood",
      width: 200,
      height: 200,
    },
    hitSize: 100,
    x: 1920,
    //Return a random height each time
    get y() {
      return random(0, 1080);
    },
    reward: {
      bloonstones: 100,
    },
    actions: {
      "move": {type:"move-action", x:-2} //Simulate movement
    },
    sequence: [
      "move"
    ],
    team: "enemy",
    health: 300,
  };
  reward = {shards: 0, bloonstones: 0}
  /** @type {Array<BossAction>} */
  actions = {}; //Essentially a registry, holds items to be used in sequence
  sequence = []; //Array of names of actions
  #action = 0; //Current action being executed
  #timer = 0; //Time the current action has been executing for.
  
  //Much like the boxes' version
  takeDamage(amount = 0, source = null) {
    super.takeDamage(amount, source);
    if (this.dead) {
      //Give destroy reward
      game.shards += this.reward.shards ??= 0;
      game.bloonstones += this.reward.bloonstones ??= 0;
      if (!source) return;
      //Stats
      source.destroyed.bosses++;
    }
  }
  init() {
    super.init()
    //Construct boss actions
    for(let name in this.actions){
      this.actions[name] = construct(this.actions[name], BossAction)
    }
  }
  tick() {
    //Tick as normal
    super.tick();
    //Do the action thing
    let currentAction = this.actions[this.sequence[this.#action]]
    if (!currentAction) return; //Stop immediately if actions empty
    if (this.#timer < currentAction.duration) {
      currentAction.tick(this);
      this.#timer++;
    } else {
      this.#action++;
      this.#timer = 0;
      if (this.#action > this.sequence.length) {
        this.#action = 0;
      }
      this.actions[this.sequence[this.#action]].execute(this);
    }
  }
}

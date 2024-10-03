class Box extends Entity {
  //Default box, for undefined world spawning entity
  static default = {
    type: this.name,
    drawer: {
      image: "box.wood",
      width: 50,
      height: 50
    },
    hitSize: 25,
    x: 1920,
    //Return a random height each time
    get y(){
      return random(0, 1080)
    },
    reward: {
      shards: 2
    },
    destroyReward: {
      shards: 5
    },
    team: "enemy",
    health: 5
  }
  //Basic metal box
  static metal = {
    type: this.name,
    drawer: {
      image: "box.metal",
      width: 50,
      height: 50
    },
    hitSize: 25,
    resistances: [
      {
        type: "ballistic",
        amount: 1 //100% resistance
      }
    ],
    x: 1920,
    //Return a random height each time
    get y(){
      return random(0, 1080)
    },
    reward: {
      shards: 2
    },
    destroyReward: {
      shards: 10 //Worth more
    },
    team: "enemy",
    health: 2 //More HP
  }
  //Rewards
  reward = { bloonstones: 0, shards: 0 };
  destroyReward = structuredClone(this.reward)
  //No moving unless explicitly stated
  speed = 0
  takeDamage(type = "normal", amount = 0, source = null){
    super.takeDamage(type, amount, source)
    if(this.dead){
      //Give destroy reward
      game.shards += this.destroyReward.shards ??= 0
      game.bloonstones += this.destroyReward.bloonstones ??= 0
      if(!source) return;
      source.destroyed.boxes ++
    }
  }
  tick(){
    if(!this.dead){
      //Move
      this.x -= game.player.speed + this.speed
      if(this.x < -this.hitSize){
        this.dead = true
        //Give basic reward
        game.shards += this.reward.shards ??= 0
        game.bloonstones += this.reward.bloonstones ??= 0
      }
      super.tick()
    }
  }
}

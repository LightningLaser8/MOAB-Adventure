//### PLAYER ###
Registry.entities.add("player", {
  type: "Entity",
  x: 300,
  y: 540,
  team: "player",
  deathSound: "player-death",
});
//### BOXES ###
Registry.entities.add("wooden-box", {
  type: "box",
  name: "Wooden Box",
  drawer: {
    image: "box.wood",
    width: 50,
    height: 50,
  },
  hitSize: 25,
  x: 1920,
  //Return a random height each time
  get y() {
    return random(0, 1080);
  },
  reward: {
    shards: 2,
  },
  destroyReward: {
    shards: 5,
  },
  team: "enemy",
  health: 5,
  healthIncrease: 1.25,
  hitSound: "wood-hit",
  deathSound: "wood-break"
});
Registry.entities.add("metal-box", {
  type: "box",
  name: "Metal Box",
  drawer: {
    image: "box.metal",
    width: 50,
    height: 50,
  },
  hitSize: 25,
  resistances: [
    {
      type: "ballistic",
      amount: 1, //100% resistance
    },
    {
      type: "laser",
      amount: 0.3, //30% resistance
    },
  ],
  x: 1920,
  //Return a random height each time
  get y() {
    return random(0, 1080);
  },
  reward: {
    shards: 2,
  },
  destroyReward: {
    shards: 10, //Worth more
  },
  team: "enemy",
  health: 20, //More HP
  healthIncrease: 5,
  hitSound: "metal-hit",
  deathSound: "metal-break"
});
//### BOSSES ###
Registry.entities.add("monkey-ace", {
  type: "boss",
  name: "Monkey Ace",
  drawer: {
    image: "boss.monkey-ace",
    width: 272,
    height: 336,
  },
  hitSize: 136,
  x: 0,
  y: 540,
  reward: {
    bloonstones: 100,
  },
  weaponSlots: [
    {
      posX: 0,
      posY: 0,
      upgrades: [".ace-radial-gun"],
      tier: 1,
    },
    {
      posX: 100,
      posY: 0,
      upgrades: [".ace-gatling-gun"],
      tier: 1,
    },
  ],
  actions: {
    fire: {
      type: "fire-weapon-action",
      slotIndex: 0,
    },
    gatling: {
      type: "fire-weapon-action",
      slotIndex: 1,
    },
    wait: {
      type: "action",
      duration: 60,
    },
    "wait-short": {
      type: "action",
      duration: 5,
    },
    reverse: {
      type: "move-action",
      duration: 30,
      x: -400,
    },
  },
  sequence: [
    "wait",
    "fire",
    "wait",
    "fire",
    "wait",
    "fire",
    "wait",
    "fire",
    "wait",
    "reverse",
    //brrrr
    "wait-short",
    "gatling",
    "wait-short",
    "gatling",
    "wait-short",
    "gatling",
    "wait-short",
    "gatling",
    "wait-short",
    "gatling",
    "wait-short",
    "gatling",
    "wait-short",
    "gatling",
    "wait-short",
    "gatling",
  ],
  team: "enemy",
  health: 100, //More HP
  healthIncrease: 150,
  trackingOffsetX: -500, // Try to stay behind blimp
  turnWhileMoving: true, //Face where it's going
  turnSpeed: 2, //planes don't turn very fast
  speed: 12,//but are fast
  hitSound: "metal-hit",
  deathSound: "boss-death" 
});
Registry.entities.add("gigantic-box", {
  type: "boss",
  name: "Gigantic Box",
  drawer: {
    image: "box.wood",
    width: 200,
    height: 200,
  },
  hitSize: 100,
  direction: 180,
  speed: 4,
  x: 1920,
  //Return a random height each time
  get y() {
    return random(0, 1080);
  },
  reward: {
    bloonstones: 100,
  },
  actions: {
    charge: {
      type: "move-action",
      duration: 20,
      x: -550,
    },
    bonk: {
      type: "fire-weapon-action",
      slotIndex: 0,
    },
    wait: {
      type: "action",
      duration: 180,
    },
  },
  weaponSlots: [
    {
      upgrades: [".box-impact"],
      tier: 1,
    },
  ],
  sequence: ["wait", "charge", "bonk"],
  team: "enemy",
  health: 200,
  healthIncrease: 200,
  trackingOffsetX: 500,
  turnWhileMoving: true,
  turnSpeed: 10,
  hitSound: "wood-hit",
  deathSound: "boss-death" 
});
Registry.entities.add("super-monkey", {
  type: "boss",
  name: "Super Monkey",
  drawer: {
    image: "boss.super-monkey",
    width: 276,
    height: 160,
  },
  hitSize: 120,
  direction: 180,
  speed: 32,
  x: 1920,
  //Return a random height each time
  get y() {
    return random(0, 1080);
  },
  reward: {
    bloonstones: 100,
  },
  actions: {
    charge: {
      type: "move-action",
      duration: 70,
      x: -3000,
    },
    leave: {
      type: "move-action",
      duration: 1,
      x: 30000
    },
    enter: {
      type: "entry-action",
      x: 1920,
    },
    "dart-throw": {
      type: "fire-weapon-action",
      slotIndex: 0,
    },
    wait: {
      type: "action",
      duration: 180,
    },
  },
  weaponSlots: [
    {
      upgrades: [".super-monkey-throw"],
      tier: 1,
    },
  ],
  sequence: [
    "charge",
    "leave",
    "wait",
    "enter",
    "dart-throw",
    "wait",
    "wait",
    "dart-throw",
    "wait",
    "dart-throw",
    "wait",
    "dart-throw",
    "wait"
  ],
  team: "enemy",
  health: -150,
  healthIncrease: 150,
  trackingOffsetX: 0,
  turnWhileMoving: true,
  turnSpeed: 4,
  deathSound: "boss-death" 
});

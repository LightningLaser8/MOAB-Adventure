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
  deathSound: "wood-break",
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
  deathSound: "metal-break",
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
      type: "action.fire-weapon",
      slotIndex: 0,
    },
    gatling: {
      type: "action.fire-weapon",
      slotIndex: 1,
    },
    wait: {
      type: "action.generic",
      duration: 60,
    },
    "wait-short": {
      type: "action.generic",
      duration: 5,
    },
    reverse: {
      type: "action.move",
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
  speed: 12, //but are fast
  hitSound: "metal-hit",
  deathSound: "boss-death",
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
      type: "action.move",
      duration: 20,
      x: -550,
    },
    bonk: {
      type: "action.fire-weapon",
      slotIndex: 0,
    },
    wait: {
      type: "action.generic",
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
  deathSound: "boss-death",
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
      type: "action.move",
      duration: 70,
      x: -3000,
    },
    leave: {
      type: "action.move",
      duration: 1,
      x: 30000,
    },
    enter: {
      type: "action.entry",
      x: 1920,
    },
    "dart-throw": {
      type: "action.fire-weapon",
      slotIndex: 0,
    },
    wait: {
      type: "action.generic",
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
    "wait",
  ],
  team: "enemy",
  health: -150,
  healthIncrease: 150,
  trackingOffsetX: 0,
  turnWhileMoving: true,
  turnSpeed: 4,
  deathSound: "boss-death",
});
//### FINAL BOSSES ###
Registry.entities.add("robo-monkey", {
  type: "final-boss",
  name: "Robo-Monkey",
  drawer: {
    image: "final-boss.robo-monkey",
    width: 276,
    height: 160,
  },
  hitSize: 120,
  direction: 180,
  speed: 10,
  x: 1920,
  y: 0,
  reward: {
    bloonstones: 100,
  },
  actions: {
    "dart-throw": {
      type: "action.fire-weapon",
      slotIndex: 0,
    },
    "laser-beam": {
      type: "action.fire-weapon",
      slotIndex: 1,
      duration: 60,
    },
    "wait-3s": {
      type: "action.generic",
      duration: 180,
    },
    "wait-1s": {
      type: "action.generic",
      duration: 60,
    },
    retarget: {
      type: "action.change-speed",
      speed: 20,
      turnSpeed: 4,
      changesBack: true,
      duration: 30,
    },
    "speed.aim": {
      type: "action.change-speed",
      speed: 2,
      turnSpeed: 0.8,
      changesBack: false,
    },
    "speed.normal": {
      type: "action.change-speed",
      speed: 10,
      turnSpeed: 4,
      changesBack: false,
    },
    spin: {
      type: "action.move",
      rot: 1440,
      duration: 60,
    },
    "summon-top": {
      type: "action.summon",
      entity: "robo-drone",
      offsetY: -50,
    },
    "summon-bottom": {
      type: "action.summon",
      entity: "robo-drone",
      offsetY: 50,
      differences: {
        trackingOffsetY: 500,
      },
    },
    airlaser: {
      type: "action.spawn-bullet",
      x: 800,
      y: 0,
      xVar: 800,
      direction: 90,
      bullet: {
        drawer: {
          image: "minion.drone",
          width: 159,
          height: 120,
        },
        spawnSound: "whirr",
        speed: 0,
        lifetime: 120,
        hitSize: -1000,
        trail: false,
        followsSource: true,
        intervalTime: 15,
        intervalNumber: 1,
        intervalBullet: {
          type: "laser",
          lifetime: 8,
          extendTime: 1,
          despawnTime: 1,
          length: 1080,
          pierce: 999,
          hitSize: 8,
          drawer: {
            shape: "rect",
            fill: [255, 255, 255],
          },
        },
        fragNumber: 1,
        fragBullet: {
          type: "continuous-laser",
          spawnSound: "laser-beam",
          lifetime: 45,
          length: 1080,
          pierce: 999,
          hitSize: 30,
          drawer: {
            shape: "rect",
            fill: [255, 50, 50],
          },
          damage: [
            {
              amount: 5,
              type: "laser",
            },
          ],
          intervalTime: 999,
          intervalNumber: 1,
          intervalBullet: {
            drawer: {
              image: "minion.drone",
              width: 159,
              height: 120,
            },
            speed: 0,
            lifetime: 120,
            hitSize: -1000,
            trail: false,
          }
        },
      },
    },
    gate: {
      type: "action.spawn-bullet",
      x: 800,
      y: 0,
      xVar: 800,
      direction: 90,
      bullet: {
        drawer: {
          image: "minion.drone",
          width: 159,
          height: 180,
        },
        spawnSound: "whirr",
        speed: 0,
        lifetime: 60,
        hitSize: -1000,
        trail: false,
        followsSource: true,
        intervalTime: 8,
        intervalNumber: 1,
        intervalBullet: {
          type: "laser",
          lifetime: 5,
          length: 1080,
          pierce: 999,
          hitSize: 8,
          drawer: {
            shape: "rect",
            fill: [255, 255, 255],
          },
        },
        fragNumber: 1,
        fragBullet: {
          type: "continuous-laser",
          spawnSound: "laser-beam",
          extendTime: 10,
          despawnTime: 20,
          lifetime: 600,
          length: 1080,
          pierce: 999,
          hitSize: 40,
          drawer: {
            shape: "rect",
            fill: [255, 255, 50],
          },
          damage: [
            {
              amount: 10,
              type: "laser",
            },
          ],
          intervalTime: 999,
          intervalNumber: 1,
          intervalBullet: {
            drawer: {
              image: "minion.drone",
              width: 159,
              height: 180,
            },
            speed: 0,
            lifetime: 630,
            hitSize: -1000,
            trail: false,
          }
        },
      },
    },
  },
  weaponSlots: [
    {
      upgrades: [".robo-monkey-throw"],
      tier: 1,
    },
    {
      upgrades: [".robo-monkey-laser"],
      tier: 1,
    },
  ],
  sequence: [
    //Main loop
    "wait-3s",
    "dart-throw",
    "wait-1s",
    "airlaser",
    "airlaser",
    "airlaser",
    "wait-1s",
    "dart-throw",
    "wait-3s",
    "speed.aim",
    "laser-beam",
    "retarget",
    "laser-beam",
    "retarget",
    "laser-beam",
    "speed.normal",
    //1
    "wait-3s",
    "dart-throw",
    "wait-1s",
    "airlaser",
    "airlaser",
    "airlaser",
    "wait-1s",
    "dart-throw",
    "wait-3s",
    "speed.aim",
    "laser-beam",
    "retarget",
    "laser-beam",
    "retarget",
    "laser-beam",
    "speed.normal",
    //intermission
    "wait-3s",
    "gate",
    //2
    "wait-1s",
    "dart-throw",
    "wait-1s",
    "airlaser",
    "airlaser",
    "airlaser",
    "wait-1s",
    "dart-throw",
    "wait-3s",
    "speed.aim",
    "laser-beam",
    "retarget",
    "laser-beam",
    "retarget",
    "laser-beam",
    "speed.normal",
    //3 times
    "spin",
    "summon-top",
    "summon-bottom",
  ],
  team: "enemy",
  health: 15000,
  healthIncrease: 0,
  trackingOffsetX: 1000,
  turnWhileMoving: false,
  turnSpeed: 4,
  deathSound: "boss-death",
  destinationWorld: "workshop",
});
Registry.entities.add("robo-drone", {
  type: "boss",
  name: "Laser Drone",
  drawer: {
    image: "minion.drone",
    width: 106,
    height: 80,
  },
  hitSize: 40,
  direction: 180,
  speed: 15,
  x: 1920,
  y: 0,
  actions: {
    "laser-beam": {
      type: "action.fire-weapon",
      slotIndex: 0,
      duration: 60,
    },
    "wait-3s": {
      type: "action.generic",
      duration: 180,
    },
    "wait-1s": {
      type: "action.generic",
      duration: 60,
    },
    "speed.aim": {
      type: "action.change-speed",
      speed: 1,
      turnSpeed: 0,
      changesBack: false,
    },
    "speed.normal": {
      type: "action.change-speed",
      speed: 15,
      turnSpeed: 10,
      changesBack: false,
    },
  },
  weaponSlots: [
    {
      upgrades: [".robo-monkey-laser"],
      tier: 1,
    },
  ],
  sequence: ["wait-3s", "speed.aim", "laser-beam", "speed.normal"],
  team: "enemy",
  health: 500,
  healthIncrease: 0,
  trackingOffsetX: 200,
  trackingOffsetY: -500,
  turnWhileMoving: true,
  turnSpeed: 10,
  deathSound: "explosion",
});

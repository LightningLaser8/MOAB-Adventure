Registry.blimps.add("moab", {
  name: "MOAB",
  health: 200,
  speed: 8,
  weaponSlots: [1],
  drawer: {
    image: "blimp.moab",
    width: 230,
    height: 150,
  },
  path1: "bfb",
  path2: "ddt"
})
Registry.blimps.add("bfb", {
  name: "BFB",
  health: 700,
  speed: 6,
  weaponSlots: [1, 2],
  positions: [{x: 50, y: 0}, {x: -100, y: 0}],
  drawer: {
    image: "blimp.bfb",
    width: 310,
    height: 220,
  },
  hitSize: 110,
  cost: {
    shards: 2500,
    bloonstones: 0
  },
  path1: "zomg"
})
Registry.blimps.add("zomg", {
  name: "ZOMG",
  health: 4000,
  speed: 3,
  weaponSlots: [1, 2, 3],
  positions: [{x: 50, y: 0}, {x: -100, y: 0}, {x: 0, y: 0}],
  drawer: {
    image: "blimp.zomg",
    width: 310,
    height: 220,
  },
  hitSize: 110,
  cost: {
    shards: 15000,
    bloonstones: 0
  },
  path1: "bad"
})
Registry.blimps.add("ddt", {
  name: "DDT",
  health: 400,
  speed: 16,
  weaponSlots: [1, 5],
  positions: [{x: 50, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: -80, y: 0}],
  drawer: {
    image: "blimp.ddt",
    width: 290,
    height: 200,
  },
  resistances: [
    {
      type: "ballistic",
      amount: 1
    },
    {
      type: "explosion",
      amount: 1
    }
  ],
  hitSize: 80,
  cost: {
    shards: 3750,
    bloonstones: 0
  },
  path2: "bad"
})
Registry.blimps.add("bad", {
  name: "BAD",
  health: 20000,
  speed: 3,
  weaponSlots: [1, 2, 3, 4],
  positions: [{x: 80, y: 0}, {x: -80, y: 0}, {x: 30, y: 50}, {x: 30, y: -50}],
  drawer: {
    image: "blimp.bad",
    width: 465,
    height: 339,
  },
  hitSize: 165,
  cost: {
    shards: 50000,
    bloonstones: 0
  }
})
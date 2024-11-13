Registry.blimps.add("moab", {
  name: "MOAB",
  health: 200,
  speed: 6,
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
  speed: 1.5,
  weaponSlots: [1, 2],
  positions: [{x: 50, y: 0}, {x: -100, y: 0}],
  drawer: {
    image: "blimp.bfb",
    width: 310,
    height: 220,
  },
  hitSize: 110,
  cost: {
    shards: 10000,
    bloonstones: 0
  },
  path1: "zomg"
})
Registry.blimps.add("zomg", {
  name: "ZOMG",
  health: 4000,
  speed: 1.08,
  weaponSlots: [1, 2, 3],
  positions: [{x: 50, y: 0}, {x: -100, y: 0}, {x: 0, y: 0}],
  drawer: {
    image: "blimp.zomg",
    width: 310,
    height: 220,
  },
  hitSize: 110,
  cost: {
    shards: 60000,
    bloonstones: 0
  },
  path1: "bad"
})
Registry.blimps.add("ddt", {
  name: "DDT",
  health: 400,
  speed: 15.84,
  weaponSlots: [1, 5],
  positions: [{x: 50, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: -80, y: 0}],
  drawer: {
    image: "blimp.ddt",
    width: 290,
    height: 200,
  },
  hitSize: 80,
  cost: {
    shards: 15000,
    bloonstones: 0
  },
  path2: "bad"
})
Registry.blimps.add("bad", {
  name: "BAD",
  health: 20000,
  speed: 1.08,
  weaponSlots: [1, 2, 3, 4],
  positions: [{x: 80, y: 0}, {x: -80, y: 0}, {x: 30, y: 50}, {x: 30, y: -50}],
  drawer: {
    image: "blimp.bad",
    width: 310,
    height: 226,
  },
  hitSize: 110,
  cost: {
    shards: 200000,
    bloonstones: 0
  }
})
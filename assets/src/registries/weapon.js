Registry.weapons.add("tiny-shooter", {
  type: "Weapon",
  name: "Tiny Shooter",
  description: "Shoots a single, low damage bullet directly forwards.",
  reload: 20,
  cost: {
    shards: 50,
    bloonstones: 0,
  },
  shoot: {
    bullet: {
      type: "Bullet",
      lifetime: 40,
      speed: 30,
      hitSize: 15,
      trail: false,
      damage: [
        {
          type: "ballistic",
          amount: 1,
        },
      ],
      drawer: {
        image: "box.metal",
        width: 20,
        height: 15,
      },
    },
    pattern: {}, //Blank pattern
  },
  parts: [
    {
      type: "Part",
      width: 40,
      height: 15,
      x: 30,
      image: false,
    },
    {
      type: "Part",
      width: 30,
      height: 30,
      image: false,
    },
  ],
});
Registry.weapons.add("double-shooter", {
  type: "Weapon",
  name: "Double Shooter",
  description: "Shoots 2 bullets at once.",
  reload: 20,
  cost: {
    shards: 200,
    bloonstones: 0,
  },
  shoot: {
    bullet: {
      type: "Bullet",
      lifetime: 40,
      speed: 30,
      hitSize: 15,
      trail: false,
      damage: [
        {
          type: "ballistic",
          amount: 1,
        },
      ],
      drawer: {
        image: "box.metal",
        width: 20,
        height: 15,
      },
    },
    pattern: {
      amount: 2,
      spacing: 2,
    },
  },
  parts: [
    {
      type: "Part",
      width: 40,
      height: 15,
      x: 30,
      y: 8,
      image: false,
    },
    {
      type: "Part",
      width: 40,
      height: 15,
      x: 30,
      y: -8,
      image: false,
    },
    {
      type: "Part",
      width: 35,
      height: 35,
      image: false,
    },
  ],
});
Registry.weapons.add("bomb-shooter", {
  type: "Weapon",
  name: "Bomb Shooter",
  description: "Shoots an explosive, dealing damage in an area.",
  reload: 60,
  cost: {
    shards: 540,
    bloonstones: 0,
  },
  shoot: {
    bullet: {
      type: "Bullet",
      lifetime: 40,
      speed: 30,
      hitSize: 30,
      trail: false,
      damage: [
        {
          type: "ballistic",
          amount: 1,
        },
        {
          type: "explosion",
          area: 150,
          amount: 2,
        },
      ],
      drawer: {
        image: "box.metal",
        width: 40,
        height: 30,
      },
    },
    pattern: {},
  },
  parts: [
    {
      type: "Part",
      width: 50,
      height: 25,
      x: 40,
      image: false,
    },
    {
      type: "Part",
      width: 40,
      height: 15,
      y: 30,
      image: false,
    },
    {
      type: "Part",
      width: 40,
      height: 15,
      y: -30,
      image: false,
    },
    {
      type: "Part",
      width: 20,
      height: 60,
      x: -35,
      image: false,
    },
    {
      type: "Part",
      width: 40,
      height: 40,
      image: false,
    },
  ],
});

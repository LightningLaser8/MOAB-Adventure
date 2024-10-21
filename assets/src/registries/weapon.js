Registry.weapons.add("tiny-shooter", {
  type: "Weapon",
  name: "Tiny Shooter",
  description: "Shoots a single, low damage\nbullet directly forwards.",
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
      type: "part",
      x: 32.5,
      y: 0,
      width: 20,
      height: 10,
      rotation: 0,
      image: false,
      recoilAnimations: [
        {
          type: "recoil-animation",
          duration: 5,
          xOffset: -15
        }
      ]
    },
    {
      type: "part",
      x: 0,
      y: 0,
      width: 25,
      height: 25,
      rotation: 0,
      image: false
    },
    {
      type: "part",
      x: 17.5,
      y: 0,
      width: 10,
      height: 15,
      rotation: 0,
      image: false
    },
    {
      type: "part",
      x: -16.25,
      y: 0,
      width: 7.5,
      height: 15,
      rotation: 0,
      image: false
    },
  ]
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
      type: "part",
      x: 32.5,
      y: 5,
      width: 20,
      height: 10,
      rotation: 0,
      image: false,
      recoilAnimations: [
        {
          type: "recoil-animation",
          duration: 5,
          xOffset: -15
        }
      ]
    },
    {
      type: "part",
      x: 32.5,
      y: -5,
      width: 20,
      height: 10,
      rotation: 0,
      image: false,
      recoilAnimations: [
        {
          type: "recoil-animation",
          duration: 5,
          xOffset: -15
        }
      ]
    },
    {
      type: "part",
      x: 0,
      y: 0,
      width: 25,
      height: 30,
      rotation: 0,
      image: false
    },
    {
      type: "part",
      x: 17.5,
      y: 0,
      width: 10,
      height: 25,
      rotation: 0,
      image: false
    },
    {
      type: "part",
      x: -15,
      y: 0,
      width: 5,
      height: 25,
      rotation: 0,
      image: false
    },
    {
      type: "part",
      x: -18.75,
      y: 0,
      width: 2.5,
      height: 10,
      rotation: 0,
      image: false
    },
  ]
});
Registry.weapons.add("bomb-shooter", {
  type: "Weapon",
  name: "Bomb Shooter",
  description: "Shoots an explosive, dealing\ndamage in an area.",
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
          amount: 3,
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
      type: "part",
      x: 37.5,
      y: 0,
      width: 30,
      height: 15,
      rotation: 0,
      image: false,
      recoilAnimations: [
        {
          type: "recoil-animation",
          duration: 5,
          xOffset: -25,
          speedRatio: 0.1
        }
      ]
    },
    {
      type: "part",
      x: 0,
      y: 0,
      width: 30,
      height: 30,
      rotation: 0,
      image: false
    },
    {
      type: "part",
      x: 18.75,
      y: 0,
      width: 7.5,
      height: 20,
      rotation: 0,
      image: false
    },
    {
      type: "part",
      x: -17.5,
      y: 0,
      width: 5,
      height: 25,
      rotation: 0,
      image: false
    },
    {
      type: "part",
      x: -26.25,
      y: 0,
      width: 7.5,
      height: 35,
      rotation: 0,
      image: false
    },
    {
      type: "part",
      x: 0,
      y: -17.5,
      width: 10,
      height: 5,
      rotation: 0,
      image: false
    },
    {
      type: "part",
      x: 0,
      y: 17.5,
      width: 10,
      height: 5,
      rotation: 0,
      image: false
    },
    {
      type: "part",
      x: -21.25,
      y: 0,
      width: 2.5,
      height: 10,
      rotation: 0,
      image: false
    },
    {
      type: "part",
      x: 22.5,
      y: -20,
      width: 15,
      height: 7.5,
      rotation: 30,
      image: false
    },
    {
      type: "part",
      x: 22.5,
      y: 20,
      width: 15,
      height: 7.5,
      rotation: -30,
      image: false
    },
    {
      type: "part",
      x: 1.25,
      y: -22.5,
      width: 35,
      height: 7.5,
      rotation: 0,
      image: false
    },
    {
      type: "part",
      x: 1.25,
      y: 22.5,
      width: 35,
      height: 7.5,
      rotation: 0,
      image: false
    },
  ]
});
Registry.weapons.add("heavy-shots", {
  type: "Weapon",
  name: "Heavy Shots",
  description: "Large bullets deal more damage,\nand knock boxes back.",
  reload: 30,
  cost: {
    shards: 400,
    bloonstones: 0,
  },
  shoot: {
    bullet: {
      type: "Bullet",
      lifetime: 40,
      knockback: 50,
      speed: 30,
      hitSize: 25,
      trail: false,
      damage: [
        {
          type: "ballistic",
          amount: 2,
        },
        {
          type: "explosion",
          amount: 0, //      Visual explosion effect
          area: 30
        },
      ],
      drawer: {
        image: "box.metal",
        width: 30,
        height: 22.5,
      },
    },
    pattern: {}, //Blank pattern
  },
  parts: [
    {
      type: "part",
      x: 31.25,
      y: 0,
      width: 5,
      height: 20,
      rotation: 0,
      image: false,
      recoilAnimations: [
        {
          type: "recoil-animation",
          duration: 10,
          xOffset: -25
        }
      ]
    },
    {
      type: "part",
      x: 32.5,
      y: 0,
      width: 25,
      height: 10,
      rotation: 0,
      image: false,
      recoilAnimations: [
        {
          type: "recoil-animation",
          duration: 7,
          xOffset: -15
        }
      ]
    },
    {
      type: "part",
      x: 0,
      y: 0,
      width: 40,
      height: 10,
      rotation: 45,
      image: false
    },
    {
      type: "part",
      x: 0,
      y: -15,
      width: 10,
      height: 5,
      rotation: 1,
      image: false
    },
    {
      type: "part",
      x: 0,
      y: 15,
      width: 10,
      height: 5,
      rotation: 0,
      image: false
    },
    {
      type: "part",
      x: -15,
      y: 0,
      width: 5,
      height: 10,
      rotation: 0,
      image: false
    },
    {
      type: "part",
      x: 0,
      y: 0,
      width: 40,
      height: 10,
      rotation: -45,
      image: false
    },
    {
      type: "part",
      x: 0,
      y: 0,
      width: 25,
      height: 25,
      rotation: 0,
      image: false
    },
    {
      type: "part",
      x: 16.25,
      y: 0,
      width: 7.5,
      height: 20,
      rotation: 0,
      image: false
    },
  ]
});
Registry.weapons.add("laser-blaster", {
  type: "Weapon",
  name: "Laser Blaster",
  description: "Shoots pulses of high-damage plasma.",
  reload: 20,
  cost: {
    shards: 350,
    bloonstones: 0,
  },
  shoot: {
    bullet: {
      type: "Bullet",
      lifetime: 40,
      speed: 40,
      hitSize: 15,
      trail: false,
      damage: [
        {
          type: "laser",
          amount: 3,
        },
      ],
      drawer: {
        shape: "ellipse",
        fill: "red",
        width: 30,
        height: 10,
      },
      trail: true,
      trailColour: [255, 0, 0, 50]
    },
    pattern: {}, //Blank pattern
  },
  parts: [
    {
      type: "part",
      x: 1.25,
      y: -17.5,
      width: 27.5,
      height: 5,
      rotation: 0,
      image: false
    },
    {
      type: "part",
      x: 1.25,
      y: 17.5,
      width: 27.5,
      height: 5,
      rotation: 0,
      image: false
    },
    {
      type: "part",
      x: -17.5,
      y: 0,
      width: 5,
      height: 30,
      rotation: 0,
      image: false
    },
    {
      type: "part",
      x: 20,
      y: 0,
      width: 0,
      height: 25,
      rotation: 0,
      image: false,
      recoilAnimations: [
        {
          type: "recoil-animation",
          duration: 5,
          xOffset: 10
        }
      ]
    },
    {
      type: "part",
      x: 30,
      y: 0,
      width: 0,
      height: 25,
      rotation: 0,
      image: false,
      recoilAnimations: [
        {
          type: "recoil-animation",
          duration: 5,
          xOffset: 50
        }
      ]
    },
    {
      type: "part",
      x: 25,
      y: 0,
      width: 0,
      height: 25,
      rotation: 0,
      image: false,
      recoilAnimations: [
        {
          type: "recoil-animation",
          duration: 5,
          xOffset: 30
        }
      ]
    },
    {
      type: "part",
      x: 35,
      y: 0,
      width: 0,
      height: 25,
      rotation: 0,
      image: false,
      recoilAnimations: [
        {
          type: "recoil-animation",
          duration: 5,
          xOffset: 70
        }
      ]
    },
    {
      type: "part",
      x: 25,
      y: -12.5,
      width: 25,
      height: 10,
      rotation: 0,
      image: false,
      recoilAnimations: [
        {
          type: "recoil-animation",
          duration: 5,
          xOffset: -7
        }
      ]
    },
    {
      type: "part",
      x: 25,
      y: 12.5,
      width: 25,
      height: 10,
      rotation: 0,
      image: false,
      recoilAnimations: [
        {
          type: "recoil-animation",
          duration: 5,
          xOffset: -7
        }
      ]
    },
    {
      type: "part",
      x: 37.5,
      y: -12.5,
      width: 10,
      height: 7.5,
      rotation: -45,
      image: false,
      recoilAnimations: [
        {
          type: "recoil-animation",
          duration: 5,
          xOffset: -7
        }
      ]
    },
    {
      type: "part",
      x: 37.5,
      y: 12.5,
      width: 7.5,
      height: 10,
      rotation: -45,
      image: false,
      recoilAnimations: [
        {
          type: "recoil-animation",
          duration: 5,
          xOffset: -7
        }
      ]
    },
    {
      type: "part",
      x: 12.5,
      y: -10,
      width: 10,
      height: 10,
      rotation: -45,
      image: false
    },
    {
      type: "part",
      x: 12.5,
      y: 10,
      width: 10,
      height: 10,
      rotation: -45,
      image: false
    },
    {
      type: "part",
      x: 0,
      y: 0,
      width: 25,
      height: 25,
      rotation: 0,
      image: false
    },
    {
      type: "part",
      x: -22.5,
      y: 0,
      width: 5,
      height: 20,
      rotation: 0,
      image: false
    },
    {
      type: "part",
      x: 12.5,
      y: -22.5,
      width: 30,
      height: 5,
      rotation: 0,
      image: false,
      recoilAnimations: [
        {
          type: "recoil-animation",
          duration: 5,
          xOffset: -15
        }
      ]
    },
    {
      type: "part",
      x: 12.5,
      y: 22.5,
      width: 30,
      height: 5,
      rotation: 0,
      image: false,
      recoilAnimations: [
        {
          type: "recoil-animation",
          duration: 5,
          xOffset: -15
        }
      ]
    },
    {
      type: "part",
      x: -27.5,
      y: 10,
      width: 30,
      height: 5,
      rotation: 27,
      slide: 15,
      image: false,
      recoilAnimations: [
        {
          type: "recoil-animation",
          duration: 5,
          rotOffset: 30
        }
      ]
    },
    {
      type: "part",
      x: -27.5,
      y: -10,
      width: 30,
      height: 5,
      rotation: -27,
      slide: 15,
      image: false,
      recoilAnimations: [
        {
          type: "recoil-animation",
          duration: 5,
          rotOffset: -30
        }
      ]
    },
  ]
});
Registry.weapons.add("rifle", {
  type: "Weapon",
  name: "Rifle",
  description: "Shoots a single, fast-moving bullet.\nPierces one box.",
  reload: 30,
  cost: {
    shards: 250,
    bloonstones: 0,
  },
  shoot: {
    bullet: {
      type: "Bullet",
      lifetime: 40,
      speed: 55,
      hitSize: 15,
      trail: false,
      pierce: 1,
      damage: [
        {
          type: "ballistic",
          amount: 2,
        },
      ],
      drawer: {
        image: "box.metal",
        width: 25,
        height: 12,
      },
    },
    pattern: {}, //Blank pattern
  },
  parts: [
    {
      type: "part",
      x: 47.5,
      y: 0,
      width: 45,
      height: 10,
      rotation: 0,
      image: false,
      recoilAnimations: [
        {
          type: "recoil-animation",
          duration: 5,
          xOffset: -20
        }
      ]
    },
    {
      type: "part",
      x: 18.75,
      y: 0,
      width: 12.5,
      height: 20,
      rotation: 0,
      image: false
    },
    {
      type: "part",
      x: -17.5,
      y: 0,
      width: 10,
      height: 20,
      rotation: 0,
      image: false
    },
    {
      type: "part",
      x: 0,
      y: 0,
      width: 10,
      height: 30,
      rotation: 0,
      image: false
    },
    {
      type: "part",
      x: 0,
      y: 17.5,
      width: 25,
      height: 5,
      rotation: 0,
      image: false
    },
    {
      type: "part",
      x: 0,
      y: -17.5,
      width: 25,
      height: 5,
      rotation: 0,
      image: false
    },
    {
      type: "part",
      x: 0,
      y: 0,
      width: 25,
      height: 25,
      rotation: 0,
      image: false
    },
  ]
});
Registry.weapons.add("incendiary", {
  type: "Weapon",
  name: "Incendiary",
  description: "Explosions set targets on fire.",
  reload: 60,
  cost: {
    shards: 1350,
    bloonstones: 0,
  },
  shoot: {
    bullet: {
      type: "Bullet",
      lifetime: 40,
      speed: 30,
      hitSize: 30,
      trail: false,
      status: "burning",
      statusDuration: 180, //3 second fire
      damage: [
        {
          type: "ballistic",
          amount: 1,
        },
        {
          type: "explosion",
          area: 150,
          amount: 3,
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
      type: "part",
      x: 37.5,
      y: 0,
      width: 30,
      height: 15,
      rotation: 0,
      slide: 0,
      image: false,
      recoilAnimations: [
        {
          type: "recoil-animation",
          duration: 5,
          xOffset: -25,
          speedRatio: 0.1
        }
      ]
    },
    {
      type: "part",
      x: 18.75,
      y: 0,
      width: 7.5,
      height: 20,
      rotation: 0,
      slide: 0,
      image: false
    },
    {
      type: "part",
      x: -17.5,
      y: 0,
      width: 5,
      height: 25,
      rotation: 0,
      slide: 0,
      image: false
    },
    {
      type: "part",
      x: -25,
      y: 0,
      width: 5,
      height: 25,
      rotation: 0,
      slide: 0,
      image: false
    },
    {
      type: "part",
      x: -21.25,
      y: 0,
      width: 2.5,
      height: 10,
      rotation: 0,
      slide: 0,
      image: false
    },
    {
      type: "part",
      x: 22.5,
      y: -25,
      width: 15,
      height: 7.5,
      rotation: 30,
      slide: 0,
      image: false
    },
    {
      type: "part",
      x: 22.5,
      y: 25,
      width: 15,
      height: 7.5,
      rotation: -30,
      slide: 0,
      image: false
    },
    {
      type: "part",
      x: 0,
      y: 0,
      width: 15,
      height: 5,
      rotation: -120,
      slide: 22.5,
      image: false
    },
    {
      type: "part",
      x: 0,
      y: 0,
      width: 15,
      height: 5,
      rotation: 120,
      slide: 22.5,
      image: false
    },
    {
      type: "part",
      x: 0,
      y: 0,
      width: 15,
      height: 5,
      rotation: 70,
      slide: 20,
      image: false
    },
    {
      type: "part",
      x: 1.25,
      y: 0,
      width: 15,
      height: 5,
      rotation: -70,
      slide: 20,
      image: false
    },
    {
      type: "part",
      x: 0,
      y: 0,
      width: 30,
      height: 30,
      rotation: 0,
      slide: 0,
      image: false
    },
    {
      type: "part",
      x: 1.25,
      y: 27.5,
      width: 35,
      height: 7.5,
      rotation: 0,
      slide: 0,
      image: false
    },
    {
      type: "part",
      x: 1.25,
      y: -27.5,
      width: 35,
      height: 7.5,
      rotation: 0,
      slide: 0,
      image: false
    },
    {
      type: "part",
      x: -20,
      y: -30,
      width: 15,
      height: 7.5,
      rotation: 30,
      slide: 0,
      image: false
    },
    {
      type: "part",
      x: -20,
      y: 30,
      width: 15,
      height: 7.5,
      rotation: -30,
      slide: 0,
      image: false
    },
    {
      type: "part",
      x: -32.5,
      y: 0,
      width: 5,
      height: 35,
      rotation: 0,
      slide: 0,
      image: false
    },
    {
      type: "part",
      x: -28.75,
      y: -6.25,
      width: 2.5,
      height: 7.5,
      rotation: 0,
      slide: 0,
      image: false
    },
    {
      type: "part",
      x: -28.75,
      y: 6.25,
      width: 2.5,
      height: 7.5,
      rotation: 0,
      slide: 0,
      image: false
    },
    {
      type: "part",
      x: -36.25,
      y: 0,
      width: 2.5,
      height: 20,
      rotation: 0,
      slide: 0,
      image: false
    },
]
});
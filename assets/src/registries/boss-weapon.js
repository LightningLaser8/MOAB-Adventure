//Name max line width = 40 chars
//Description max line width = 51 chars, prefer 50
//Description max line number = 4 lines, prefer 3

//These aren't usually obtainable.

//## MONKEY ACE ##
Registry.weapons.add(".ace-radial-gun", {
  name: ".ace-radial-gun",
  shoot: {
    bullet: {
      type: "Bullet",
      lifetime: 80,
      speed: 30,
      hitSize: 10,
      trail: false,
      damage: [
        {
          type: "ballistic",
          amount: 3,
          levelScaling: 2,
        },
      ],
      drawer: {
        image: "bullet.normal",
        width: 56,
        height: 16,
      },
    },
    pattern: {
      amount: 8,
      spacing: 45,
    },
  },
});
Registry.weapons.add(".ace-gatling-gun", {
  name: ".ace-gatling-gun",
  shoot: {
    bullet: {
      type: "Bullet",
      lifetime: 120,
      speed: 30,
      hitSize: 8,
      trail: false,
      damage: [
        {
          type: "ballistic",
          amount: 2.5,
          levelScaling: 0.5,
        },
      ],
      drawer: {
        image: "bullet.normal",
        width: 28,
        height: 16,
      },
      intervalNumber: 1,
      intervalTime: 9999,
      intervalBullet: {
        lifetime: 0,
        speed: 0,
        damage: [
          {
            area: 60,
            amount: 0,
            type: "no",
          },
        ],
      },
    },
    pattern: {
      spread: 5,
      amount: 2, //impression of more brrr
    },
  },
});
//## GIGANTIC BOX ##
Registry.weapons.add(".box-impact", {
  name: ".box-impact",
  shoot: {
    bullet: {
      type: "Bullet",
      lifetime: 0,
      speed: 0,
      hitSize: 0,
      trail: false,
      knockback: 200,
      kineticKnockback: true,
      damage: [
        {
          type: "impact",
          amount: 15,
          area: 175,
          sparkColour: [0, 0, 0, 0],
          sparkColourTo: [0, 0, 0, 0],
          levelScaling: 10,
        },
      ],
    },
    pattern: {},
  },
});
//## WORMS ##
Registry.weapons.add(".worm-gun", {
  get reload() {
    return rnd(180, 240);
  },
  shoot: {
    bullet: {
      type: "Bullet",
      lifetime: 60,
      speed: 60,
      hitSize: 7.5,
      damage: [
        {
          type: "laser",
          amount: 1,
          levelScaling: 1,
        },
      ],
      drawer: {
        shape: "ellipse",
        fill: "red",
        width: 30,
        height: 5,
      },
      trail: true,
      pierce: 1,
      trailColour: [255, 0, 0, 50],
    },
    pattern: {}, //Blank pattern
  },
  parts: [
    {
      type: "part",
      x: 0,
      y: 0,
      width: 25,
      height: 25,
      rotation: 0,
      slide: 0,
      colour: [0, 0, 0],
      image: false,
    },
    {
      type: "part",
      x: 16.25,
      y: 12.5,
      width: 17.5,
      height: 7.5,
      rotation: -18,
      slide: 0,
      colour: [56, 56, 56],
      image: false,
    },
    {
      type: "part",
      x: 16.25,
      y: -12.5,
      width: 17.5,
      height: 7.5,
      rotation: 18,
      slide: 0,
      colour: [56, 56, 56],
      image: false,
    },
    {
      type: "part",
      x: 16.25,
      y: 0,
      width: 7.5,
      height: 7.5,
      rotation: 0,
      slide: 0,
      colour: [56, 56, 56],
      image: false,
    },
    {
      type: "part",
      x: -15,
      y: 0,
      width: 5,
      height: 20,
      rotation: 0,
      slide: 0,
      colour: [56, 56, 56],
      image: false,
    },
    {
      type: "part",
      x: 0,
      y: -15,
      width: 17.5,
      height: 7.5,
      rotation: 0,
      slide: 0,
      colour: [56, 56, 56],
      image: false,
    },
    {
      type: "part",
      x: 0,
      y: 15,
      width: 17.5,
      height: 7.5,
      rotation: 0,
      slide: 0,
      colour: [56, 56, 56],
      image: false,
    },
    {
      type: "part",
      x: 0,
      y: -15,
      width: 12.5,
      height: 2.5,
      rotation: 0,
      slide: 0,
      colour: [255, 0, 0],
      image: false,
    },
    {
      type: "part",
      x: 0,
      y: 15,
      width: 12.5,
      height: 2.5,
      rotation: 0,
      slide: 0,
      colour: [255, 0, 0],
      image: false,
    },
    {
      type: "part",
      x: 0,
      y: 0,
      width: 20,
      height: 15,
      rotation: 0,
      slide: 0,
      colour: [255, 0, 0],
      image: false,
    },
    {
      type: "part",
      x: 0,
      y: 0,
      width: 15,
      height: 10,
      rotation: 0,
      slide: 0,
      colour: [0, 0, 0],
      image: false,
    },
    {
      type: "part",
      x: 16.25,
      y: -12.5,
      width: 7.5,
      height: 2.5,
      rotation: 18,
      slide: 0,
      colour: [255, 0, 0],
      image: false,
    },
    {
      type: "part",
      x: 16.25,
      y: 12.5,
      width: 7.5,
      height: 2.5,
      rotation: -18,
      slide: 0,
      colour: [255, 0, 0],
      image: false,
    },
    {
      type: "part",
      x: 0,
      y: -6.25,
      width: 7.5,
      height: 5,
      rotation: 0,
      slide: 0,
      colour: [0, 0, 0],
      image: false,
    },
    {
      type: "part",
      x: 0,
      y: -5,
      width: 2.5,
      height: 7.5,
      rotation: 0,
      slide: 0,
      colour: [255, 0, 0],
      image: false,
    },
  ],
});

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
          amount: 1,
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
          levelScaling: 5,
        },
      ],
    },
    pattern: {},
  },
});

//## SUPER MONKEY ##
Registry.weapons.add(".super-monkey-throw", {
  name: ".super-monkey-throw",
  shoot: {
    bullet: {
      type: "Bullet",
      lifetime: 40,
      speed: 0,
      pierce: 9999999,
      hitSize: -1000,
      trail: false,
      //Gives the impression of many shots
      intervalBullet: {
        lifetime: 45,
        speed: 45,
        hitSize: 5,
        trail: true,
        damage: [
          {
            type: "ballistic",
            amount: -1,
            levelScaling: 0.5,
          },
          {
            type: "no",
            amount: 0,
            area: 40,
            smokeColour: [0, 0, 0, 0],
            smokeColourTo: [0, 0, 0, 0],
            waveColour: [255, 255, 255, -2000],
            sparkColour: [255, 255, 255],
            sparkColourTo: [255, 255, 255]
          }
        ],
        drawer: {
          image: "bullet.normal", //should really be a dart but i don't have the asset
          width: 32,
          height: 16,
        },
      },
      intervalTime: 2,
      intervalNumber: 1,
      followsSource: true,
    },
    pattern: {},
  },
});

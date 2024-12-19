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
          amount: 10,
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
      spacing: 45
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
          amount: 3,
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
            type: "no"
          }
        ]
      }
    },
    pattern: {
      spread: 5,
      amount: 2 //impression of more brrr
    },
  },
});
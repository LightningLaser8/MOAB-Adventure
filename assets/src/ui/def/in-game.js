const background = {
  bg1: new ImageUIComponent(
    960,
    540,
    1920,
    1080,
    null,
    images.background.sea,
    false
  ),
  bg2: new ImageUIComponent(
    960 * 3 - 4,
    540,
    1920,
    1080,
    null,
    images.background.sea,
    false
  ),
  draw() {
    this.bg1.draw();
    this.bg2.draw();
  },
  tick(dt) {
    this.bg1.x -= dt;
    this.bg2.x -= dt;
    if (this.bg2.x <= 956) {
      this.bg1.x += 1920;
      this.bg2.x += 1920;
    }
  },
  get image() {
    return this.bg2.image;
  },
  set image(_) {
    this.bg1.image = this.bg2.image = _;
  },
};

//Currency counters
createUIComponent(["in-game"], [], 350, 55, 700, 125, "right");
//Shards
createUIImageComponent(
  ["in-game"],
  [],
  40,
  60,
  65,
  75,
  null,
  images.ui.shard,
  false
);
//Overwrite text
UIComponent.alignLeft(
  Object.defineProperty(
    createUIComponent(
      ["in-game"],
      [],
      80,
      60,
      0,
      0,
      "none",
      null,
      "shards",
      true,
      60
    ),
    "text",
    {
      get: () => shortenedNumber(game.shards),
    }
  )
);
//Bloonstones
createUIImageComponent(
  ["in-game"],
  [],
  330,
  60,
  60,
  75,
  null,
  images.ui.bloonstone,
  false
);
//Overwrite text
UIComponent.alignLeft(
  Object.defineProperty(
    createUIComponent(
      ["in-game"],
      [],
      370,
      60,
      0,
      0,
      "none",
      null,
      "bloonstones",
      true,
      60
    ),
    "text",
    {
      get: () => shortenedNumber(game.bloonstones),
    }
  )
);

//Healthbar
UIComponent.invert(
  //Healthbar container
  createUIComponent(["in-game"], [], 400, 1020, 800, 125, "right")
);
UIComponent.setBackgroundOf(
  UIComponent.invert(
    //bit behind healthbar
    createUIComponent(["in-game"], [], 350, 1020, 700, 64, "right")
  ),
  [0, 0, 0]
);
Object.defineProperties(
  UIComponent.removeOutline(
    UIComponent.setBackgroundOf(
      UIComponent.invert(
        //Match shape of underlying bar
        createUIComponent(["in-game"], [], 350, 1020, 700, 64, "right")
      ),
      [255, 0, 0] //Red bar
    )
  ),
  {
    width: {
      get: () =>
        //Width depends on player max hp %
        game.player ? (700 * game.player.health) / game.player.maxHealth : 700,
    },
    x: {
      get: () =>
        //Move to stay left aligned
        game.player
          ? (700 * game.player.health) / game.player.maxHealth / 2
          : 350,
    },
  }
);
//Name display
let nameBG;
UIComponent.setBackgroundOf(
  UIComponent.invert(
    //Upside-down on top of healthbar
    (nameBG = Object.defineProperties(
      createUIComponent(["in-game"], [], 200, 905, 400, 100, "right"),
      {
        width: {
          get: () => {
            push();
            textSize(60);
            let width = textWidth(game.player.name) + nameBG.height + 40;
            pop();
            return width;
          },
        },
        x: {
          get: () => nameBG.width / 2,
        },
      }
    ))
  ),
  [50, 50, 50]
);
//Backup background
UIComponent.removeOutline(
  UIComponent.invert(
    //Upside-down on top of healthbar
    Object.defineProperties(
      createUIComponent(["in-game"], [], 200, 905, 400, 80, "right"),
      {
        width: {
          get: () => nameBG.width - 20,
        },
        x: {
          get: () => nameBG.x - 20,
        },
      }
    )
  )
);
UIComponent.alignLeft(
  Object.defineProperties(
    createUIComponent(
      ["in-game"],
      [],
      20,
      905,
      0,
      0,
      "none",
      null,
      "e",
      false,
      60
    ),
    {
      text: {
        get: () =>
          //Make text dependent on player name
          game.player ? game.player.name : "mobe",
      },
    }
  )
);
//Level Counter
createUIComponent(["in-game"], [], 150, 175, 300, 90, "right");
UIComponent.alignLeft(
  Object.defineProperty(
    createUIComponent(
      ["in-game"],
      [],
      20,
      175,
      0,
      0,
      "right",
      null,
      "",
      true,
      60
    ),
    "text",
    {
      get: () => "LV " + game.level,
    }
  )
);
//Boss Timer
UIComponent.setCondition("boss:no"); //No boss by default
//Like healthbar, but not
UIComponent.invert(
  //boss timer bar container
  createUIComponent(
    ["in-game"],
    ["boss:no"], //Only show if no boss, if boss then show boss' healthbar instead
    1520,
    60,
    800,
    100,
    "left"
  )
);
UIComponent.setBackgroundOf(
  UIComponent.invert(
    //bit behind bar
    createUIComponent(
      ["in-game"],
      ["boss:no"],
      1600,
      60,
      600,
      50,
      "left"
    )
  ),
  [0, 0, 0]
);
Object.defineProperties(
  UIComponent.removeOutline(
    UIComponent.setBackgroundOf(
      UIComponent.invert(
        //Match shape of underlying bar
        createUIComponent(
          ["in-game"],
          ["boss:no"],
          1600,
          60,
          600,
          50,
          "left"
        )
      ),
      [255, 0, 0] //Red bar
    )
  ),
  {
    width: {
      get: () =>
        //Width depends on boss timer %
        (600 * game.bosstimer) / game.bossinterval,
    },
    x: {
      get: () =>
        //Move to stay right aligned
        1900 - (300 * game.bosstimer) / game.bossinterval,
    },
  }
);
createUIImageComponent(
  ["in-game"],
  ["boss:no"],
  1240,
  60,
  80,
  80,
  null,
  images.ui.clock,
  false
);

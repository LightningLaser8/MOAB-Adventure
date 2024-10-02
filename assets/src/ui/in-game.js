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
    createUIComponent(["in-game"], [], 370, 1020, 700, 64, "right")
  ),
  [0, 0, 0]
);
Object.defineProperties(
  UIComponent.removeOutline(
    UIComponent.setBackgroundOf(
      UIComponent.invert(
        //Match shape of underlying bar
        createUIComponent(["in-game"], [], 370, 1020, 700, 64, "right")
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
          ? 20 + (700 * game.player.health) / game.player.maxHealth / 2
          : 370,
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
    createUIComponent(["in-game"], ["boss:no"], 1600, 60, 600, 50, "left")
  ),
  [0, 0, 0]
);
Object.defineProperties(
  UIComponent.removeOutline(
    UIComponent.setBackgroundOf(
      UIComponent.invert(
        //Match shape of underlying bar
        createUIComponent(["in-game"], ["boss:no"], 1600, 60, 600, 50, "left")
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

//  Upgrade Menu
//Translucent blue background
UIComponent.removeOutline(
  UIComponent.setBackgroundOf(
    createUIComponent(
      ["in-game"],
      ["upgrade-menu-open:true"],
      900,
      575,
      800,
      700
    ),
    [0, 255, 255, 100]
  )
);
//Vertical line bit
UIComponent.removeOutline(
  UIComponent.setBackgroundOf(
    createUIComponent(
      ["in-game"],
      ["upgrade-menu-open:true"],
      900,
      110,
      50,
      125
    ),
    [0, 255, 255, 100]
  )
);
//Open / Close Buttons
UIComponent.setCondition("upgrade-menu-open:false");
UIComponent.setCondition("was-game-paused:false");
createUIComponent(
  ["in-game"],
  ["upgrade-menu-open:false"],
  900,
  25,
  250,
  50,
  "none",
  () => {
    //Store current pause state under `was-game-paused`
    UIComponent.setCondition("was-game-paused:"+(game.paused?"true":"false"));
    game.paused = true //Pause the game
    UIComponent.setCondition("upgrade-menu-open:true");
  },
  "Upgrades"
);
createUIComponent(
  ["in-game"],
  ["upgrade-menu-open:true"],
  900,
  25,
  250,
  50,
  "none",
  () => {
    //Return game to previous state
    game.paused = UIComponent.evaluateCondition("was-game-paused:true");
    UIComponent.setCondition("upgrade-menu-open:false");
  },
  "Close"
);
//Header bar
createUIComponent(
  ["in-game"],
  ["upgrade-menu-open:true"],
  900, //Left pos = 500px
  225,
  800,
  100,
  "none",
  null,
  "Upgrades",
  false,
  60
)

//Weapon Upgrades
//Title text
createUIComponent(
  ["in-game"],
  ["upgrade-menu-open:true", "submenu-selected:none"],
  900,
  325,
  0,
  0,
  "none",
  null,
  "Weapons",
  false,
  40
)
//Buttons
//Space them 150px apart => 100px wide => 50px separation?
//AP3 at x = 900
// Set conditions: All hidden
UIComponent.setCondition("is-ap1-available:true")
UIComponent.setCondition("is-ap2-available:true")
UIComponent.setCondition("is-ap3-available:true")
UIComponent.setCondition("is-ap4-available:true") //AP3 and 4 are separate
UIComponent.setCondition("is-ap5-available:true")
//Sub-menu
UIComponent.setCondition("submenu-selected:none")
//AP1
createUIComponent(
  ["in-game"],
  ["upgrade-menu-open:true", "is-ap1-available:true", "submenu-selected:none"],
  600,
  425,
  100,
  60,
  "none",
  () => {
    UIComponent.setCondition("submenu-selected:ap1")
  },
  "AP1",
  true,
  40
)
//AP2
createUIComponent(
  ["in-game"],
  ["upgrade-menu-open:true", "is-ap2-available:true", "submenu-selected:none"],
  750,
  425,
  100,
  60,
  "none",
  () => {
    UIComponent.setCondition("submenu-selected:ap2")
  },
  "AP2",
  true,
  40
)
//AP3
createUIComponent(
  ["in-game"],
  ["upgrade-menu-open:true", "is-ap3-available:true", "submenu-selected:none"],
  900,
  425,
  100,
  60,
  "none",
  () => {
    UIComponent.setCondition("submenu-selected:ap3")
  },
  "AP3",
  true,
  40
)
//AP4
createUIComponent(
  ["in-game"],
  ["upgrade-menu-open:true", "is-ap4-available:true", "submenu-selected:none"],
  1050,
  425,
  100,
  60,
  "none",
  () => {
    UIComponent.setCondition("submenu-selected:ap4")
  },
  "AP4",
  true,
  40
)
//AP5
createUIComponent(
  ["in-game"],
  ["upgrade-menu-open:true", "is-ap5-available:true", "submenu-selected:none"],
  1200,
  425,
  100,
  60,
  "none",
  () => {
    UIComponent.setCondition("submenu-selected:ap5")
  },
  "AP5",
  true,
  40
)
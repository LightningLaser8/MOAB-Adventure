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

//###################################################################
//
// in-game UI > informative UI > CURRENCY COUNTERS
//
//###################################################################

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

//###################################################################
//
// in-game UI > informative UI > HEALTHBAR
//
//###################################################################

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
//###################################################################
//
// in-game UI > informative UI > BOSSBAR
//
//###################################################################

UIComponent.setCondition("boss:no"); //No boss by default

//    When boss inactive
//Like healthbar, but not
UIComponent.invert(
  //boss timer bar container
  createUIComponent(
    ["in-game"],
    ["boss:no"], //Only show if no boss, if boss then show boss' healthbar instead
    1520,
    50,
    800,
    100,
    "left"
  )
);
UIComponent.setBackgroundOf(
  UIComponent.invert(
    //bit behind bar
    createUIComponent(["in-game"], ["boss:no"], 1600, 50, 600, 50, "left")
  ),
  [0, 0, 0]
);
Object.defineProperties(
  UIComponent.removeOutline(
    UIComponent.setBackgroundOf(
      UIComponent.invert(
        //Match shape of underlying bar
        createUIComponent(["in-game"], ["boss:no"], 1600, 50, 600, 50, "left")
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
  50,
  80,
  80,
  null,
  images.ui.clock,
  false
);
//  When boss active
//Boss healthbar
createUIComponent(
  ["in-game"],
  ["boss:yes"], //Only show if boss is active
  1475,
  140,
  400,
  50,
  "left"
)
UIComponent.alignRight(
  Object.defineProperty(
    createUIComponent(
      ["in-game"],
      ["boss:yes"], //Only show if boss is active
      1666,
      140,
      0,
      0,
      "left"
    ),
    "text",
    {
      get: () => world.getFirstBoss()?.name ?? "Boss" //Text is name
    }
  )
)
UIComponent.setBackgroundOf(
  UIComponent.invert(
    //bit behind bar
    createUIComponent(["in-game"], ["boss:yes"], 1425, 200, 500, 50, "left")
  ),
  [0, 0, 0]
);
Object.defineProperties(
  UIComponent.removeOutline(
    UIComponent.setBackgroundOf(
      UIComponent.invert(
        //Match shape of underlying bar
        createUIComponent(["in-game"], ["boss:yes"], 1425, 200, 500, 50, "left")
      ),
      [255, 0, 0] //Red bar
    )
  ),
  {
    width: {
      get: () =>
        //Width depends on boss health %
        (500 * (world.getFirstBoss()?.health ?? 1)) / (world.getFirstBoss()?.maxHealth ?? 1),
    },
    x: {
      get: () =>
        //Move to stay right aligned
        1725 - (300 * (world.getFirstBoss()?.health ?? 1)) / (world.getFirstBoss()?.maxHealth ?? 1),
    },
  }
);
//bottom thing
UIComponent.invert(
  createUIComponent(
    ["in-game"],
    ["boss:yes"], //Only show if boss is active
    1600,
    245,
    350,
    20,
    "left"
  )
)
//HP thing
UIComponent.alignRight(
  Object.defineProperty(
    createUIComponent(
      ["in-game"],
      ["boss:yes"], //Only show if boss is active
      1666,
      245,
      0,
      0,
      "none",
      null,
      "",
      true
    ),
    "text",
    {
      get: () => {
        let boss = world.getFirstBoss();
        if(!boss) return "unknown";
        return (shortenedNumber(boss.health ?? 1) + "/" + shortenedNumber(boss.maxHealth ?? 1))
      } //Text is hp / max hp
    }
  )
)
//square thing with boss class
Object.defineProperty(
  createUIComponent(
    ["in-game"],
    ["boss:yes"], //Only show if boss is active
    1760,
    185,
    150,
    150,
    "none",
    null,
    "o",
    false,
    60
  ), "text", {
    get: () => world.getFirstBoss()?.class??"o" //Show boss class if it exists, otherwise show "o"
  }
)

//###################################################################
//
// in-game UI > interactable UI > UPGRADE MENU
//
//###################################################################


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
    UIComponent.setCondition(
      "was-game-paused:" + (game.paused ? "true" : "false")
    );
    game.paused = true; //Pause the game
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
);

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
);
//Buttons
//Space them 150px apart => 100px wide => 50px separation?
//AP3 at x = 900
// Set conditions: All available
UIComponent.setCondition("is-ap1-available:false");
UIComponent.setCondition("is-ap2-available:false");
UIComponent.setCondition("is-ap3-available:false");
UIComponent.setCondition("is-ap4-available:false"); //AP3 and 4 are separate
UIComponent.setCondition("is-ap5-available:false");
//Sub-menu
UIComponent.setCondition("submenu-selected:none");
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
    UIComponent.setCondition("submenu-selected:ap1");
  },
  "AP1",
  true,
  40
);
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
    UIComponent.setCondition("submenu-selected:ap2");
  },
  "AP2",
  true,
  40
);
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
    UIComponent.setCondition("submenu-selected:ap3");
  },
  "AP3",
  true,
  40
);
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
    UIComponent.setCondition("submenu-selected:ap4");
  },
  "AP4",
  true,
  40
);
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
    UIComponent.setCondition("submenu-selected:ap5");
  },
  "AP5",
  true,
  40
);


//    Sub-menus
function getSelectedSlotIndex() {
  //Returns the index for the selected slot.
  if (UIComponent.evaluateCondition("submenu-selected:ap1")) return 0;
  if (UIComponent.evaluateCondition("submenu-selected:ap2")) return 1;
  if (UIComponent.evaluateCondition("submenu-selected:ap3")) return 2;
  if (UIComponent.evaluateCondition("submenu-selected:ap4")) return 3;
  if (UIComponent.evaluateCondition("submenu-selected:ap5")) return 4;
  return -1;
}
//  Back button
createUIComponent(
  ["in-game"],
  ["upgrade-menu-open:true", "submenu-selected:ap1|ap2|ap3|ap4|ap5|blimp"],
  525,
  225,
  50,
  100,
  "none",
  () => {
    UIComponent.setCondition("submenu-selected:none");
  },
  "<",
  false,
  60
);

//###################################################################
//
// in-game UI > interactable UI > upgrade menu > WEAPON UPGRADE MENU
//
//###################################################################

//Title
Object.defineProperty(
  createUIComponent(
    ["in-game"],
    ["upgrade-menu-open:true", "submenu-selected:ap1|ap2|ap3|ap4|ap5"],
    900,
    325,
    0,
    0,
    "none",
    null,
    "ERROR",
    false,
    40
  ),
  "text",
  {
    get: () => "Weapon: AP" + (getSelectedSlotIndex() + 1), //Dynamically change based on selected slot
  }
);
//Current upgrade info
Object.defineProperty(
  createUIComponent(
    //Name
    ["in-game"],
    ["upgrade-menu-open:true", "submenu-selected:ap1|ap2|ap3|ap4|ap5"], //Assuming AP is available
    900,
    380,
    750,
    40,
    "none",
    null,
    "Not unlocked yet",
    true,
    30
  ),
  "text",
  {
    get: () => {
      const slot = getSelectedSlotIndex();
      if (!game?.player) return "No player";
      if (!game?.player?.weaponSlots[slot]) return "Slot Unavailable"; //in case not
      let upgrade = game.player.weaponSlots[slot].tier - 1;
      let regname = game.player.weaponSlots[slot].upgrades[upgrade] ?? "";
      let weapon = { name: "Not unlocked" };
      if (Registry.weapons.has(regname)) {
        weapon = Registry.weapons.get(regname);
      }
      return weapon.name;
    },
  }
);
Object.defineProperty(
  createUIComponent(
    //Description
    ["in-game"],
    ["upgrade-menu-open:true", "submenu-selected:ap1|ap2|ap3|ap4|ap5"], //Assuming AP is available
    900,
    475,
    750,
    100,
    "none",
    null,
    "No weapon is present. Upgrade to add one.",
    true,
    20
  ),
  "text",
  {
    get: () => {
      const slot = getSelectedSlotIndex();
      if (!game?.player) return "No player";
      if (!game?.player?.weaponSlots[slot])
        return "This weapon slot is not present on\nthe current blimp.";
      let upgrade = game.player.weaponSlots[slot].tier - 1;
      let regname = game.player.weaponSlots[slot].upgrades[upgrade] ?? "";
      let weapon = { name: "No weapon is present. Upgrade to add one." };
      if (Registry.weapons.has(regname)) {
        weapon = Registry.weapons.get(regname);
      }
      return weapon.description;
    },
  }
);
//Next upgrade info
createUIComponent(
  ["in-game"],
  ["upgrade-menu-open:true", "submenu-selected:ap1|ap2|ap3|ap4|ap5"],
  900,
  565,
  0,
  0,
  "none",
  null,
  "Upgrade To:",
  false,
  35
);
Object.defineProperty(
  createUIComponent(
    //Name
    ["in-game"],
    ["upgrade-menu-open:true", "submenu-selected:ap1|ap2|ap3|ap4|ap5"], //Assuming AP is available
    900,
    625,
    750,
    40,
    "none",
    null,
    "Max Upgrades",
    true,
    30
  ),
  "text",
  {
    get: () => {
      const slot = getSelectedSlotIndex();
      if (!game?.player) return "No player";
      if (!game?.player?.weaponSlots[slot]) return "Slot Unavailable";
      let upgrade = game.player.weaponSlots[slot].tier;
      let regname = game.player.weaponSlots[slot].upgrades[upgrade] ?? "";
      let weapon = { name: "Max Upgrades" };
      if (Registry.weapons.has(regname)) {
        weapon = Registry.weapons.get(regname);
      }
      return weapon.name;
    },
  }
);
Object.defineProperty(
  createUIComponent(
    //Description
    ["in-game"],
    ["upgrade-menu-open:true", "submenu-selected:ap1|ap2|ap3|ap4|ap5"], //Assuming AP is available
    835,
    720,
    625,
    100,
    "none",
    null,
    "Maximum upgrade level for this blimp\nhas been reached.",
    true,
    20
  ),
  "text",
  {
    get: () => {
      const slot = getSelectedSlotIndex();
      if (!game?.player) return "No player";
      if (!game?.player?.weaponSlots[slot])
        return "This weapon slot is not present on\nthe current blimp.";
      let upgrade = game.player.weaponSlots[slot].tier;
      let regname = game.player.weaponSlots[slot].upgrades[upgrade] ?? "";
      let weapon = {
        name: "Maximum upgrade level for this blimp\nhas been reached.",
      };
      if (Registry.weapons.has(regname)) {
        weapon = Registry.weapons.get(regname);
      }
      return weapon.description;
    },
  }
);
createUIComponent(
  //Cost background
  ["in-game"],
  ["upgrade-menu-open:true", "submenu-selected:ap1|ap2|ap3|ap4|ap5"], //Assuming AP is available
  1225,
  720,
  100,
  100,
  "none",
  null,
  "",
  true,
  20
);
createUIImageComponent(
  //Shard icon
  ["in-game"],
  ["upgrade-menu-open:true", "submenu-selected:ap1|ap2|ap3|ap4|ap5"], //Assuming AP is available
  1200,
  700,
  30,
  30,
  null,
  images.ui.shard,
  false
);
createUIImageComponent(
  //Bloonstone icon
  ["in-game"],
  ["upgrade-menu-open:true", "submenu-selected:ap1|ap2|ap3|ap4|ap5"], //Assuming AP is available
  1200,
  740,
  30,
  30,
  null,
  images.ui.bloonstone,
  false
);
UIComponent.alignLeft(
  Object.defineProperty(
    createUIComponent(
      //Shard Cost
      ["in-game"],
      ["upgrade-menu-open:true", "submenu-selected:ap1|ap2|ap3|ap4|ap5"], //Assuming AP is available
      1225,
      700,
      0,
      0,
      "none",
      null,
      "",
      true,
      20
    ),
    "text",
    {
      get: () => {
        const slot = getSelectedSlotIndex();
        if (!game?.player) return "⚠";
        if (!game?.player?.weaponSlots[slot]) return "⚠";
        let upgrade = game.player.weaponSlots[slot].tier;
        let regname = game.player.weaponSlots[slot].upgrades[upgrade] ?? "";
        let weapon = {};
        if (Registry.weapons.has(regname)) {
          weapon = Registry.weapons.get(regname);
        }
        return shortenedNumber(weapon.cost?.shards ?? 0);
      },
    }
  )
);
UIComponent.alignLeft(
  Object.defineProperty(
    createUIComponent(
      //Bloonstone Cost
      ["in-game"],
      ["upgrade-menu-open:true", "submenu-selected:ap1|ap2|ap3|ap4|ap5"], //Assuming AP is available
      1225,
      740,
      0,
      0,
      "none",
      null,
      "",
      true,
      20
    ),
    "text",
    {
      get: () => {
        const slot = getSelectedSlotIndex();
        if (!game?.player) return "⚠";
        if (!game?.player?.weaponSlots[slot]) return "⚠";
        let upgrade = game.player.weaponSlots[slot].tier;
        let regname = game.player.weaponSlots[slot].upgrades[upgrade] ?? "";
        let weapon = {};
        if (Registry.weapons.has(regname)) {
          weapon = Registry.weapons.get(regname);
        }
        return shortenedNumber(weapon.cost?.bloonstones ?? 0);
      },
    }
  )
);
createUIComponent(
  ["in-game"],
  ["upgrade-menu-open:true", "submenu-selected:ap1|ap2|ap3|ap4|ap5"],
  900,
  825,
  700,
  60,
  "none",
  () => {
    const slot = getSelectedSlotIndex();
    if (!game?.player) return;
    if (!game?.player?.weaponSlots[slot]) return;
    game.player.weaponSlots[slot].attemptUpgrade();
    game.player.weaponSlots[slot].tick(1); //Make the game realise the weapon got upgraded
  },
  "Upgrade!",
  false,
  20
);

//###################################################################
//
// in-game UI > interactable UI > upgrade menu > BLIMP UPGRADE MENU
//
//###################################################################

//Entry Button
createUIComponent(
  ["in-game"],
  ["upgrade-menu-open:true", "submenu-selected:none"],
  1000,
  525,
  500,
  60,
  "none",
  () => {
    UIComponent.setCondition("submenu-selected:blimp");
  },
  "Blimp",
  true,
  40
);
//Title
createUIComponent(
  ["in-game"],
  ["upgrade-menu-open:true", "submenu-selected:blimp"],
  900,
  325,
  0,
  0,
  "none",
  null,
  "Primary: ",
  false,
  40
),
//Path 1
Object.defineProperty(
  createUIComponent(
    //Name
    ["in-game"],
    ["upgrade-menu-open:true", "submenu-selected:blimp"], //Assuming AP is available
    900,
    380,
    750,
    40,
    "none",
    null,
    "Not unlocked yet",
    true,
    30
  ),
  "text",
  {
    get: () => {
      if (!game?.player) return "No player";
      if (!game?.player?.blimp) return "No Blimp (something went wrong)"; //in case not
      let upgrade = game.player.blimp.path1
      if(!upgrade || upgrade === "none") return "No Upgrade"
      let blimp = Registry.blimps.get(upgrade)
      return blimp.name;
    },
  }
);
Object.defineProperty(
  createUIComponent(
    //Description
    ["in-game"],
    ["upgrade-menu-open:true", "submenu-selected:blimp"], //Assuming AP is available
    835,
    475,
    625,
    100,
    "none",
    null,
    "No weapon is present. Upgrade to add one.",
    true,
    25
  ),
  "text",
  {
    get: () => {
      if (!game?.player) return "No player";
      if (!game?.player?.blimp) return "No Blimp (something went wrong)"; //in case not
      let upgrade = game.player.blimp.path1
      if(!upgrade || upgrade === "none") return "This path has no upgrade for this blimp."
      let blimp = Registry.blimps.get(upgrade)
      return "Max HP: "+blimp.health+" | Speed: "+blimp.speed;
    },
  }
);
//Next upgrade info
createUIComponent(
  ["in-game"],
  ["upgrade-menu-open:true", "submenu-selected:blimp"],
  900,
  565,
  0,
  0,
  "none",
  null,
  "Alternative: ",
  false,
  35
);
Object.defineProperty(
  createUIComponent(
    //Name
    ["in-game"],
    ["upgrade-menu-open:true", "submenu-selected:blimp"], //Assuming AP is available
    900,
    625,
    750,
    40,
    "none",
    null,
    "Max Upgrades",
    true,
    30
  ),
  "text",
  {
    get: () => {
      if (!game?.player) return "No player";
      if (!game?.player?.blimp) return "No Blimp (something went wrong)"; //in case not
      let upgrade = game.player.blimp.path2
      if(!upgrade || upgrade === "none") return "No Upgrade"
      let blimp = Registry.blimps.get(upgrade)
      return blimp.name;
    },
  }
);
Object.defineProperty(
  createUIComponent(
    //'Description': Health, speed etc
    ["in-game"],
    ["upgrade-menu-open:true", "submenu-selected:blimp"], //Assuming AP is available
    835,
    720,
    625,
    100,
    "none",
    null,
    "Maximum upgrade level for this blimp\nhas been reached.",
    true,
    25
  ),
  "text",
  {
    get: () => {
      if (!game?.player) return "No player";
      if (!game?.player?.blimp) return "No Blimp (something went wrong)"; //in case not
      let upgrade = game.player.blimp.path2
      if(!upgrade || upgrade === "none") return "This path has no upgrade for this blimp."
      let blimp = Registry.blimps.get(upgrade)
      return "Max HP: "+blimp.health+" | Speed: "+blimp.speed;
    },
  }
);
//Costs
createUIComponent(
  //Cost background
  ["in-game"],
  ["upgrade-menu-open:true", "submenu-selected:blimp"], //Assuming AP is available
  1225,
  475,
  100,
  100,
  "none",
  null,
  "",
  true,
  20
);
createUIImageComponent(
  //Shard icon
  ["in-game"],
  ["upgrade-menu-open:true", "submenu-selected:blimp"], //Assuming AP is available
  1200,
  455,
  30,
  30,
  null,
  images.ui.shard,
  false
);
createUIImageComponent(
  //Bloonstone icon
  ["in-game"],
  ["upgrade-menu-open:true", "submenu-selected:blimp"], //Assuming AP is available
  1200,
  495,
  30,
  30,
  null,
  images.ui.bloonstone,
  false
);
UIComponent.alignLeft(
  Object.defineProperty(
    createUIComponent(
      //Shard Cost
      ["in-game"],
      ["upgrade-menu-open:true", "submenu-selected:blimp"], //Assuming AP is available
      1225,
      455,
      0,
      0,
      "none",
      null,
      "",
      true,
      20
    ),
    "text",
    {
      get: () => {
        if (!game?.player) return "⚠";
        if (!game?.player?.blimp) return "⚠"; //in case not
        let upgrade = game.player.blimp.path1
        if(!upgrade || upgrade === "none") return "..."
        let blimp = Registry.blimps.get(upgrade)
        return shortenedNumber(blimp?.cost?.shards??0);
      },
    }
  )
);
UIComponent.alignLeft(
  Object.defineProperty(
    createUIComponent(
      //Bloonstone Cost
      ["in-game"],
      ["upgrade-menu-open:true", "submenu-selected:blimp"], //Assuming AP is available
      1225,
      495,
      0,
      0,
      "none",
      null,
      "",
      true,
      20
    ),
    "text",
    {
      get: () => {
        if (!game?.player) return "⚠";
        if (!game?.player?.blimp) return "⚠"; //in case not
        let upgrade = game.player.blimp.path1
        if(!upgrade || upgrade === "none") return "..."
        let blimp = Registry.blimps.get(upgrade)
        return shortenedNumber(blimp?.cost?.bloonstones??0);
      },
    }
  )
);
//cost 2
//Costs
createUIComponent(
  //Cost background
  ["in-game"],
  ["upgrade-menu-open:true", "submenu-selected:blimp"], //Assuming AP is available
  1225,
  720,
  100,
  100,
  "none",
  null,
  "",
  true,
  20
);
createUIImageComponent(
  //Shard icon
  ["in-game"],
  ["upgrade-menu-open:true", "submenu-selected:blimp"], //Assuming AP is available
  1200,
  700,
  30,
  30,
  null,
  images.ui.shard,
  false
);
createUIImageComponent(
  //Bloonstone icon
  ["in-game"],
  ["upgrade-menu-open:true", "submenu-selected:blimp"], //Assuming AP is available
  1200,
  740,
  30,
  30,
  null,
  images.ui.bloonstone,
  false
);
UIComponent.alignLeft(
  Object.defineProperty(
    createUIComponent(
      //Shard Cost
      ["in-game"],
      ["upgrade-menu-open:true", "submenu-selected:blimp"], //Assuming AP is available
      1225,
      700,
      0,
      0,
      "none",
      null,
      "",
      true,
      20
    ),
    "text",
    {
      get: () => {
        if (!game?.player) return "⚠";
        if (!game?.player?.blimp) return "⚠"; //in case not
        let upgrade = game.player.blimp.path2
        if(!upgrade || upgrade === "none") return "..."
        let blimp = Registry.blimps.get(upgrade)
        return shortenedNumber(blimp?.cost?.shards??0);
      },
    }
  )
);
UIComponent.alignLeft(
  Object.defineProperty(
    createUIComponent(
      //Bloonstone Cost
      ["in-game"],
      ["upgrade-menu-open:true", "submenu-selected:blimp"], //Assuming AP is available
      1225,
      740,
      0,
      0,
      "none",
      null,
      "",
      true,
      20
    ),
    "text",
    {
      get: () => {
        if (!game?.player) return "⚠";
        if (!game?.player?.blimp) return "⚠"; //in case not
        let upgrade = game.player.blimp.path2
        if(!upgrade || upgrade === "none") return "..."
        let blimp = Registry.blimps.get(upgrade)
        return shortenedNumber(blimp?.cost?.bloonstones??0);
      },
    }
  )
);
//buttons
createUIComponent(
  ["in-game"],
  ["upgrade-menu-open:true", "submenu-selected:blimp"],
  725,
  825,
  350,
  60,
  "none",
  () => {
    if (!game?.player) return;
    if (!game?.player?.blimp) return;
    let upgrade = game.player.blimp.path1
    if(!upgrade || upgrade === "none") return;
    let blimp = Registry.blimps.get(upgrade)
    //Check cost and buy
    let shards = (blimp?.cost?.shards??0),
    bloonstones = (blimp?.cost?.bloonstones??0);
    if(shards <= game.shards && bloonstones <= game.bloonstones){
      game.shards -= shards;
      game.bloonstones -= bloonstones;
      game.player.upgrade(upgrade)
    }
  },
  "Upgrade\nPrimary",
  false,
  20
);
createUIComponent(
  ["in-game"],
  ["upgrade-menu-open:true", "submenu-selected:blimp"],
  1100,
  825,
  350,
  60,
  "none",
  () => {
    if (!game?.player) return;
    if (!game?.player?.blimp) return;
    let upgrade = game.player.blimp.path2
    if(!upgrade || upgrade === "none") return;
    let blimp = Registry.blimps.get(upgrade)
    //Check cost and buy
    let shards = (blimp?.cost?.shards??0),
    bloonstones = (blimp?.cost?.bloonstones??0);
    if(shards <= game.shards && bloonstones <= game.bloonstones){
      game.shards -= shards;
      game.bloonstones -= bloonstones;
      game.player.upgrade(upgrade)
    }
  },
  "Upgrade\nAlternative",
  false,
  20
);
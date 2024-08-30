function createUIComponent(
  screens = [],
  conditions = [],
  x = 0,
  y = 0,
  width = 1,
  height = 1,
  bevel = "none",
  onpress = null,
  shownText = "",
  useOCR = false,
  shownTextSize = 20
) {
  //Make component
  const component = new UIComponent(
    x,
    y,
    width,
    height,
    bevel,
    onpress ?? (() => {}),
    shownText,
    useOCR,
    shownTextSize
  );
  component.conditions = conditions;
  //Set conditional things
  component.acceptedScreens = screens;
  component.isInteractive = !!onpress;
  //Add to game
  ui.components.push(component);
  return component;
}

function createUIImageComponent(
  screens = [],
  conditions = [],
  x = 0,
  y = 0,
  width = 1,
  height = 1,
  onpress = null,
  shownImage = null,
  outline = true
) {
  //Make component
  const component = new ImageUIComponent(
    x,
    y,
    width,
    height,
    shownImage,
    onpress ?? (() => {}),
    outline
  );
  component.conditions = conditions;
  //Set conditional things
  component.acceptedScreens = screens;
  component.isInteractive = !!onpress;
  //Add to game
  ui.components.push(component);
  return component;
}

function createGamePropertySelector(
  screens = [],
  conditions = [],
  x = 0,
  y = 0,
  bufferWidth = 1,
  optionWidth = 1,
  height = 1,
  property = "",
  options = [""],
  shownTexts = [""],
  shownTextSize = 50
) {
  //Create display name
  createUIComponent(
    screens,
    conditions,
    x + property.length * shownTextSize * 0.375 + 50,
    y - 65,
    0,
    0,
    "none",
    undefined,
    property,
    false,
    shownTextSize * 0.8
  );
  //Create indicator
  let diffindicator = createUIComponent(
    screens,
    conditions,
    x + bufferWidth / 2,
    y,
    bufferWidth,
    height,
    "right",
    undefined,
    "> ",
    false,
    shownTextSize
  );
  let len = Math.min(options.length, shownTexts.length); //Get smallest array, don't use blanks
  for (let i = 0; i < len; i++) {
    //For each option or text
    //Make a selector option
    let component = createUIComponent(
      screens,
      conditions,
      x + bufferWidth + optionWidth * (i + 0.5),
      y,
      optionWidth,
      height,
      "both",
      () => {
        game[property] = options[i]; //Set the property
        diffindicator.text = (options[i][0] ?? options[i]) + "  "; //Make the indicator show it
        diffindicator.textSize = shownTextSize * 0.8; //Make it fit
        diffindicator.chosen = options[i];
      },
      shownTexts[i],
      true,
      shownTextSize
    );
    //Highlight if the diffindicator has chosen this button's option
    Object.defineProperty(component, "emphasised", {
      get: () => diffindicator.chosen === options[i],
    });
  }
}

//   Title Screen 'title-screen'

//Play button on title screen
createUIComponent(
  ["title"],
  [],
  960,
  870,
  350,
  100,
  "none",
  () => {
    ui.menuState = "start-menu";
  },
  "Play",
  false,
  60
);

//   Start Menu 'start-menu'

//Start menu background and header
createUIComponent(["start-menu"], [], 960, 540, 700, 700);
createUIComponent(
  ["start-menu"],
  [],
  960,
  220,
  1000,
  75,
  "none",
  undefined,
  "         Select Option",
  false,
  50
);
//Back to title screen button
createUIComponent(
  ["start-menu"],
  [],
  570,
  222,
  200,
  50,
  "none",
  () => {
    ui.menuState = "title";
  },
  "< Back",
  false,
  30
);

//Options Buttons
createUIComponent(
  ["start-menu"],
  [],
  960,
  700,
  400,
  80,
  "none",
  () => {
    ui.menuState = "options";
  },
  "Options",
  true,
  65
);
createUIComponent(
  ["start-menu"],
  [],
  960,
  400,
  400,
  80,
  "none",
  () => {
    ui.menuState = "new-game";
  },
  "New Game",
  true,
  65
);
createUIComponent(
  ["start-menu"],
  [],
  960,
  550,
  400,
  80,
  "none",
  undefined, //Decorative element - auto click suppression
  "Load Game",
  true,
  60
);

//    Start sub-menus
createUIComponent(
  ["options", "new-game", "weapon-slots"],
  [],
  960,
  540,
  1500,
  900
);
createUIComponent(
  ["options"],
  [],
  960,
  120,
  1500,
  75,
  "none",
  undefined,
  "Game Options",
  false,
  50
);
createUIComponent(
  ["new-game"],
  [],
  960,
  120,
  1500,
  75,
  "none",
  undefined,
  "Create Game",
  false,
  50
);
createUIComponent(
  ["options", "new-game"],
  [],
  320,
  122,
  200,
  50,
  "none",
  () => {
    ui.menuState = "start-menu";
  },
  "< Back",
  false,
  30
);

//    Options Menu 'options'
//Difficulty selector
createGamePropertySelector(
  ["new-game"],
  [],
  250,
  260,
  100,
  250,
  60,
  "difficulty",
  ["easy", "normal", "hard"],
  ["Easy", "Normal", "Hard"],
  50
);
//Game mode selector
createGamePropertySelector(
  ["new-game"],
  [],
  250,
  400,
  100,
  350,
  60,
  "mode",
  ["adventure", "boss-rush", "sandbox"],
  ["Adventure", "Boss Rush", "Sandbox"],
  50
);
//Save slot selector
createGamePropertySelector(
  ["new-game"],
  [],
  250,
  540,
  100,
  140,
  60,
  "saveslot",
  [0, 1, 2, 3, 4, 5],
  ["0", "1", "2", "3", "4", "5"],
  50
);
//Weapon Slot menu 'weapon-slots'
createUIComponent(
  //Button to get there
  ["new-game"],
  [],
  450,
  722,
  400,
  60,
  "right",
  () => {
    ui.menuState = "weapon-slots";
  },
  "Weapons...  ",
  false,
  35
);
createUIComponent(
  ["weapon-slots"],
  [],
  960,
  120,
  1500,
  75,
  "none",
  undefined,
  "Weapon Slots",
  false,
  50
);
createUIComponent(
  ["weapon-slots"],
  [],
  320,
  122,
  200,
  50,
  "none",
  () => {
    ui.menuState = "new-game";
  },
  "< Back",
  false,
  30
);
createUIImageComponent(
  ["weapon-slots"],
  [],
  500,
  540,
  400,
  400,
  null,
  images.ui.moab,
  false
);
createUIComponent(
  ["weapon-slots"],
  [],
  680,
  400,
  200,
  50,
  "both",
  () => {
    UIComponent.setCondition("open-slot:ap1")
  },
  "AP1",
  false,
  35
);
createUIComponent(
  ["weapon-slots"],
  [],
  680,
  500,
  200,
  50,
  "both",
  () => {
    UIComponent.setCondition("open-slot:ap2")
  },
  "AP2",
  false,
  35
);
createUIComponent(
  ["weapon-slots"],
  [],
  680,
  600,
  200,
  50,
  "both",
  () => {
    UIComponent.setCondition("open-slot:ap3/4")
  },
  "AP3/4",
  false,
  25
);
createUIComponent(
  ["weapon-slots"],
  [],
  680,
  700,
  200,
  50,
  "both",
  () => {
    UIComponent.setCondition("open-slot:ap5")
  },
  "AP5",
  false,
  35
);
UIComponent.setCondition("open-slot:none") //Create condition property
createUIComponent( //Background
  ["weapon-slots"],
  [],
  1275,
  530,
  750,
  600
)
//AP1
UIComponent.setCondition("ap1-slot:none")
createUIComponent(
  ["weapon-slots"],
  ["open-slot:ap1"],
  1100,
  330,
  300,
  100,
  "none",
  () => {
    UIComponent.setCondition("ap1-slot:1")
  },
  "Heavy\nArtillery",
  true,
  45
)
createUIComponent(
  ["weapon-slots"],
  ["open-slot:ap1"],
  1450,
  330,
  300,
  100,
  "none",
  () => {
    UIComponent.setCondition("ap1-slot:2")
  },
  "Missile\nLauncher",
  true,
  45
)
createUIComponent(
  ["weapon-slots"],
  ["open-slot:ap1", "ap1-slot:1"],
  1275,
  430,
  0,
  0,
  "none",
  null,
  "AP1.1: Heavy Artillery",
  true,
  45
)
createUIComponent(
  ["weapon-slots"],
  ["open-slot:ap1", "ap1-slot:1"],
  1275,
  600,
  0,
  0,
  "none",
  null,
  "Wide-range exploding projectile attacks.\nFire rate: Slow\nDamage: High\nArea: Large\nAim Required: Medium-High\nSupport Value: None",
  true,
  30
)
createUIComponent(
  ["weapon-slots"],
  ["open-slot:ap1", "ap1-slot:2"],
  1275,
  430,
  0,
  0,
  "none",
  null,
  "AP1.2: Missile Launcher",
  true,
  45
)
createUIComponent(
  ["weapon-slots"],
  ["open-slot:ap1", "ap1-slot:2"],
  1275,
  600,
  0,
  0,
  "none",
  null,
  "Fast bursts of homing explosives.\nFire rate: High in bursts\nDamage: Low\nArea: Small\nAim Required: Low to none\nSupport Value: Low",
  true,
  30
)
//AP2
UIComponent.setCondition("ap2-slot:none")
createUIComponent(
  ["weapon-slots"],
  ["open-slot:ap2"],
  1100,
  330,
  300,
  100,
  "none",
  () => {
    UIComponent.setCondition("ap2-slot:1")
  },
  "Box\nManipulation",
  true,
  40
)
createUIComponent(
  ["weapon-slots"],
  ["open-slot:ap2"],
  1450,
  330,
  300,
  100,
  "none",
  () => {
    UIComponent.setCondition("ap2-slot:2")
  },
  "Boss Slowdown\n and Debuffing",
  true,
  35
)
createUIComponent(
  ["weapon-slots"],
  ["open-slot:ap2", "ap2-slot:1"],
  1275,
  430,
  0,
  0,
  "none",
  null,
  "AP2.1: Box Manipulation",
  true,
  45
)
createUIComponent(
  ["weapon-slots"],
  ["open-slot:ap2", "ap2-slot:1"],
  1275,
  600,
  0,
  0,
  "none",
  null,
  "Attacks based on moving boxes around.\nFire rate: Medium\nDamage: Medium\nArea: None\nAim Required: High\nSupport Value: Medium",
  true,
  30
)
createUIComponent(
  ["weapon-slots"],
  ["open-slot:ap2", "ap2-slot:2"],
  1275,
  430,
  0,
  0,
  "none",
  null,
  "AP2.2: Boss Slowdown and Debuffing",
  true,
  35
)
createUIComponent(
  ["weapon-slots"],
  ["open-slot:ap2", "ap2-slot:2"],
  1275,
  600,
  0,
  0,
  "none",
  null,
  "Attacks focused on making bosses\neasier to deal with.\nFire rate: Medium\nDamage: Low\nArea: Small\nAim Required: Medium\nSupport Value: High",
  true,
  30
)
//AP3/4
UIComponent.setCondition("ap3/4-slot:none")
createUIComponent(
  ["weapon-slots"],
  ["open-slot:ap3/4"],
  1100,
  330,
  300,
  100,
  "none",
  () => {
    UIComponent.setCondition("ap3/4-slot:1")
  },
  "Continuous\nLaser Beam",
  true,
  40
)
createUIComponent(
  ["weapon-slots"],
  ["open-slot:ap3/4"],
  1450,
  330,
  300,
  100,
  "none",
  () => {
    UIComponent.setCondition("ap3/4-slot:2")
  },
  "Instant\nDamage",
  true,
  45
)
createUIComponent(
  ["weapon-slots"],
  ["open-slot:ap3/4", "ap3/4-slot:1"],
  1275,
  430,
  0,
  0,
  "none",
  null,
  "AP3/4.1: Continuous Laser Beam",
  true,
  40
)
createUIComponent(
  ["weapon-slots"],
  ["open-slot:ap3/4", "ap3/4-slot:1"],
  1275,
  600,
  0,
  0,
  "none",
  null,
  "Persistent piercing lasers that follow\nthe mouse pointer.\nFire rate: Low, but lasts a while\nDamage: High over time\nArea: Very Low\nAim Required: Medium-High\nSupport Value: None",
  true,
  30
)
createUIComponent(
  ["weapon-slots"],
  ["open-slot:ap3/4", "ap3/4-slot:2"],
  1275,
  430,
  0,
  0,
  "none",
  null,
  "AP3/4.2: Instant Damage",
  true,
  35
)
createUIComponent(
  ["weapon-slots"],
  ["open-slot:ap3/4", "ap3/4-slot:2"],
  1275,
  600,
  0,
  0,
  "none",
  null,
  "Gets all the damage out in one burst.\nFire rate: Medium-Low\nDamage: Very High\nArea: Small\nAim Required: High\nSupport Value: None",
  true,
  30
)
//AP5
UIComponent.setCondition("ap5-slot:none")
createUIComponent(
  ["weapon-slots"],
  ["open-slot:ap5"],
  1100,
  330,
  300,
  100,
  "none",
  () => {
    UIComponent.setCondition("ap5-slot:1")
  },
  "Single-Target\nSniper",
  true,
  40
)
createUIComponent(
  ["weapon-slots"],
  ["open-slot:ap5"],
  1450,
  330,
  300,
  100,
  "none",
  () => {
    UIComponent.setCondition("ap5-slot:2")
  },
  "Shotgun.",
  true,
  60
)
createUIComponent(
  ["weapon-slots"],
  ["open-slot:ap5", "ap5-slot:1"],
  1275,
  430,
  0,
  0,
  "none",
  null,
  "AP5.1: Single-Target Sniper",
  true,
  40
)
createUIComponent(
  ["weapon-slots"],
  ["open-slot:ap5", "ap5-slot:1"],
  1275,
  600,
  0,
  0,
  "none",
  null,
  "Single-target bolts that follow\nthe mouse pointer.\nFire rate: Low\nDamage: Extremely High\nArea: Possibly Negative\nAim Required: Very High\nSupport Value: None",
  true,
  30
)
createUIComponent(
  ["weapon-slots"],
  ["open-slot:ap5", "ap5-slot:2"],
  1275,
  430,
  0,
  0,
  "none",
  null,
  "AP5.2: Shotgun",
  true,
  35
)
createUIComponent(
  ["weapon-slots"],
  ["open-slot:ap5", "ap5-slot:2"],
  1275,
  600,
  0,
  0,
  "none",
  null,
  "Shoots wide-angle bursts of bullets.\nFire rate: Medium, but many projectiles\nDamage: Low\nArea: Wide\nAim Required: Low\nSupport Value: Low",
  true,
  30
)
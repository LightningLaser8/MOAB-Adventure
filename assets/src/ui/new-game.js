//    New Game Menu 'new-game'
UIComponent.setCondition("difficulty:none");
//Difficulty selector
createGamePropertySelector(
  ["new-game"],
  ["difficulty:none|easy|normal|hard"],
  250,
  260,
  100,
  250,
  60,
  "difficulty",
  ["easy", "normal", "hard"],
  null,
  ["Easy", "Normal", "Hard"],
  50,
  (value) => UIComponent.setCondition("difficulty:" + value)
);
//selector, dummy edition
createGamePropertySelector(
  ["new-game"],
  ["difficulty:impossible"],
  250,
  260,
  100,
  250,
  60,
  "difficulty",
  ["impossible", "impossible", "impossible"],
  0,
  ["Easy", "Normal", "Hard"],
  50,
  () => {},
  [255, 0, 0]
);
createUIComponent(
  ["new-game"],
  ["difficulty:impossible"],
  1300,
  260,
  400,
  60,
  "both",
  null,
  "Impossible",
  true,
  50
).outlineColour = [255, 255, 0];
createUIComponent(
  ["new-game"],
  ["difficulty:impossible"],
  1530,
  260,
  55,
  60,
  "both",
  null
).outlineColour = [255, 0, 0];
UIComponent.setCondition("mode:none");
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
  null,
  ["Adventure", "Boss Rush", "Sandbox"],
  50,
  (value) => UIComponent.setCondition("mode:" + value)
);
UIComponent.setCondition("saveslot:none");
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
  null,
  ["0", "1", "2", "3", "4", "5"],
  50,
  (value) => UIComponent.setCondition("saveslot:" + value)
);
//Weapon slot button
createUIComponent(
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
//Start game button
createUIComponent(
  ["new-game"],
  [
    "ap1-slot:1|2",
    "ap2-slot:1|2",
    "ap3/4-slot:1|2",
    "ap5-slot:1|2",
    "difficulty:easy|normal|hard|impossible",
    "saveslot:0|1|2|3|4|5",
  ],
  960,
  900,
  400,
  100,
  "none",
  () => {
    ui.menuState = "in-game";
    createPlayer();
  },
  "Start!",
  false,
  60
);
createUIComponent(
  ["new-game"],
  ["any", "ap1-slot:none", "ap2-slot:none", "ap3/4-slot:none", "ap5-slot:none"],
  960,
  800,
  0,
  0,
  "none",
  null,
  "Choose All\nWeapon Slots"
);
createUIComponent(
  ["new-game"],
  ["mode:none"],
  960,
  840,
  0,
  0,
  "none",
  null,
  "Choose Game Mode"
);
createUIComponent(
  ["new-game"],
  ["saveslot:none"],
  960,
  870,
  0,
  0,
  "none",
  null,
  "Choose Save Slot"
);
createUIComponent(
  ["new-game"],
  ["difficulty:none"],
  960,
  900,
  0,
  0,
  "none",
  null,
  "Choose Difficulty"
);

//what?! impossible! inconceivable!
//innocuous little square
createUIComponent(
  ["new-game"],
  ["difficulty:none|easy|normal|hard"],
  1925,
  60,
  30,
  30,
  "none",
  () => {
    game.difficulty = "impossible";
    UIComponent.setCondition("difficulty:impossible");
    uiBlindingFlash(1925, 60, 255, 100, 1500);
    versionReplacementText = "Version 6.6.6 - No escape.";
  },
  ""
);
//fires
createParticleEmitter(
  ["new-game", "options", "weapon-slots"],
  ["difficulty:impossible"],
  960,
  1080,
  0,
  1,
  {
    type: "vfx.particle",
    cone: 0,
    maxXOffset: 760,
    emissions: 2,
    particle: {
      //All
      lifetime: 180,
      direction: -90,
      speed: 5,
      decel: 0.015,
      rotateSpeed: 0,
      moveWithBackground: false,
      shape: "rhombus",
      widthFrom: 60,
      widthTo: 0,
      heightFrom: 120,
      heightTo: 200,
      colourFrom: [255, 255, 50, 50],
      colourTo: [255, 0, 0, 0],
    },
  }
);
createParticleEmitter(
  ["start-menu"],
  ["difficulty:impossible"],
  960,
  1000,
  0,
  1,
  {
    type: "vfx.particle",
    cone: 0,
    maxXOffset: 360,
    emissions: 1,
    particle: {
      //All
      lifetime: 180,
      direction: -90,
      speed: 5,
      decel: 0.015,
      rotateSpeed: 0,
      moveWithBackground: false,
      shape: "rhombus",
      widthFrom: 60,
      widthTo: 0,
      heightFrom: 120,
      heightTo: 200,
      colourFrom: [255, 255, 50, 50],
      colourTo: [255, 0, 0, 0],
    },
  }
);
createParticleEmitter(["title"], ["difficulty:impossible"], 960, 800, 0, 1, {
  type: "vfx.particle",
  cone: 0,
  maxXOffset: 560,
  emissions: 1,
  particle: {
    //All
    lifetime: 180,
    direction: -90,
    speed: 5,
    decel: 0.015,
    rotateSpeed: 0,
    moveWithBackground: false,
    shape: "rhombus",
    widthFrom: 60,
    widthTo: 0,
    heightFrom: 120,
    heightTo: 200,
    colourFrom: [255, 150, 50, 50],
    colourTo: [255, 0, 0, 0],
  },
});
createParticleEmitter(
  ["title"],
  ["difficulty:impossible"],
  960,
  1000,
  0,
  1,
  {
    type: "vfx.particle",
    cone: 0,
    maxXOffset: 200,
    particle: {
      //All
      lifetime: 180,
      direction: -90,
      speed: 5,
      decel: 0.015,
      rotateSpeed: 0,
      moveWithBackground: false,
      shape: "rhombus",
      widthFrom: 60,
      widthTo: 0,
      heightFrom: 120,
      heightTo: 200,
      colourFrom: [255, 255, 50, 50],
      colourTo: [255, 0, 0, 0],
    },
  },
  3
);
createParticleEmitter(
  ["you-died", "you-win", "crash"],
  ["difficulty:impossible"],
  960,
  1000,
  0,
  1,
  {
    type: "vfx.particle",
    cone: 0,
    maxXOffset: 500,
    emissions: 1,
    particle: {
      //All
      lifetime: 180,
      direction: -90,
      speed: 5,
      decel: 0.015,
      rotateSpeed: 0,
      moveWithBackground: false,
      shape: "rhombus",
      widthFrom: 60,
      widthTo: 0,
      heightFrom: 120,
      heightTo: 200,
      colourFrom: [255, 255, 50, 50],
      colourTo: [255, 0, 0, 0],
    },
  }
);

createParticleEmitter(["in-game"], ["difficulty:impossible"], 960, 1080, 0, 1, {
  type: "vfx.particle",
  cone: 0,
  maxXOffset: 960,
  emissions: 3,
  particle: {
    //All
    lifetime: 120,
    direction: -90,
    speed: 3,
    decel: 0.015,
    rotateSpeed: 0,
    moveWithBackground: false,
    shape: "rhombus",
    widthFrom: 40,
    widthTo: 0,
    heightFrom: 90,
    heightTo: 160,
    colourFrom: [255, 255, 150, 50],
    colourTo: [255, 0, 0, 0],
  },
});
createParticleEmitter(["in-game"], ["difficulty:impossible"], 960, 0, 0, 1, {
  type: "vfx.particle",
  cone: 0,
  maxXOffset: 960,
  emissions: 3,
  particle: {
    //All
    lifetime: 120,
    direction: 90,
    speed: 3,
    decel: 0.015,
    rotateSpeed: 0,
    moveWithBackground: false,
    shape: "rhombus",
    widthFrom: 40,
    widthTo: 0,
    heightFrom: 90,
    heightTo: 160,
    colourFrom: [255, 100, 50, 50],
    colourTo: [255, 0, 0, 0],
  },
});
//mouse fire
Object.defineProperties(
  createParticleEmitter(
    ["new-game", "options", "weapon-slots", "title", "start-menu"],
    ["difficulty:impossible"],
    960,
    1080,
    0,
    1,
    {
      type: "vfx.particle",
      cone: 0,
      maxXOffset: 20,
      maxYOffset: 20,
      particle: {
        //All
        lifetime: 60,
        direction: -90,
        speed: 2,
        decel: 0.015,
        rotateSpeed: 0,
        moveWithBackground: false,
        shape: "rhombus",
        widthFrom: 30,
        widthTo: 0,
        heightFrom: 60,
        heightTo: 100,
        colourFrom: [255, 255, 50, 50],
        colourTo: [255, 0, 0, 0],
      },
    },
    5
  ),
  {
    x: {
      get: () => ui.mouse.x,
    },
    y: {
      get: () => ui.mouse.y,
    },
  }
);

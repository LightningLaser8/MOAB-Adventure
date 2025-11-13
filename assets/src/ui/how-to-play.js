createUIComponent(
  ["how-to-play"],
  [],
  960,
  970,
  500,
  100,
  "none",
  () => {
    ui.menuState = "title";
  },
  "Return",
  false,
  60
);

createUIImageComponent(["how-to-play"], [], 400, 300, 230, 150, null, "blimp.moab", false);
createUIImageComponent(["how-to-play"], [], 400, 300, 550, 550, null, "ui.4-move", false);
Object.defineProperty(
  createUIComponent(["how-to-play"], [], 400, 130, 75, 75, "none", null, "W", true, 60),
  "text",
  {
    get: () => game.keybinds.key("move-up").toUpperCase(),
  }
);
Object.defineProperty(
  createUIComponent(["how-to-play"], [], 400, 470, 75, 75, "none", null, "S", true, 60),
  "text",
  {
    get: () => game.keybinds.key("move-down").toUpperCase(),
  }
);
Object.defineProperty(
  createUIComponent(["how-to-play"], [], 230, 300, 75, 75, "none", null, "A", true, 60),
  "text",
  {
    get: () => game.keybinds.key("move-left").toUpperCase(),
  }
);
Object.defineProperty(
  createUIComponent(["how-to-play"], [], 570, 300, 75, 75, "none", null, "D", true, 60),
  "text",
  {
    get: () => game.keybinds.key("move-right").toUpperCase(),
  }
);

createUIImageComponent(["how-to-play"], [], 800, 400, 193, 130, null, "ui.shotgun", false);
createUIImageComponent(["how-to-play"], [], 1100, 380, 75, 75, null, "box.wood", false).angle = 1;
for (let b = 0; b < 7; b++)
  createUIImageComponent(
    ["how-to-play"],
    [],
    1200 + b * 100,
    380 + rnd(-30, 120),
    75,
    75,
    null,
    tru(0.2) ? "box.metal" : "box.wood",
    false
  );
createUIImageComponent(["how-to-play"], [], 800, 400, 500, 500, null, "ui.shoot", false).angle =
  Math.PI / 2;
createUIComponent(["how-to-play"], [], 800, 500, 150, 75, "none", null, "LMB", true, 60);

// Fake healthbar
createUIComponent(["how-to-play"], [], 1650, 110, 0, 0, "none", null, "Bad", true, 60).textColour =
  "#fff";
createUIComponent(["how-to-play"], [], 1650, 150, 0, 0, "none", null, "v", true, 60).textColour =
  "#fff";
UIComponent.invert(createUIComponent(["how-to-play"], [], 1650, 220, 450, 62.5, "right"));
const fakehp = {
  get health() {
    return frameCount % 300 > 200 ? 200 : 200 - (frameCount % 300);
  },
  maxHealth: 200,
};
UIComponent.invert(
  createHealthbarComponent(
    ["how-to-play"],
    [],
    1615,
    220,
    340,
    32,
    "right",
    undefined,
    undefined,
    undefined,
    20,
    fakehp,
    [255, 0, 0]
  )
);

createUIComponent(
  ["how-to-play"],
  [],
  1000,
  200,
  600,
  200,
  "none",
  null,
  `
Movement controls on left. 
Click to fire.

Dodge or shoot the boxes, don't let your
health hit zero.
`,
  true,
  24
);
///////////////////////////////////////////////////////////////
createUIImageComponent(
  ["how-to-play"],
  [],
  60,
  650,
  272,
  336,
  null,
  "boss.monkey-ace",
  false
).angle = 1;
createUIImageComponent(["how-to-play"], [], 120, 500, 100, 100, null, "ui.clock", false);
createUIComponent(
  ["how-to-play"],
  [],
  450,
  750,
  600,
  200,
  "none",
  null,
  `
The boss timer on the top-right will
constantly go down.
When it hits zero, the next boss will
spawn. There are 10 bosses per zone,
and the final one is much harder than
the others.
`,
  true,
  24
);

///////////////////////////////////////////////////////////////////////

createUIComponent(
  ["how-to-play"],
  [],
  1450,
  750,
  600,
  200,
  "none",
  null,
  `
Bosses cannot simply be dodged, they
must be shot.
Some bosses may have minions, which
will leave when there are no more
bosses left.
`,
  true,
  24
);
createUIComponent(
  ["how-to-play"],
  [],
  1450,
  718,
  0,
  0,
  "none",
  null,
  "must be shot.",
  true,
  24
).textColour = "#900";
(function () {
  let effect = createUIComponent(
    ["how-to-play"],
    [],
    1450,
    722,
    0,
    0,
    "none",
    null,
    "must be shot.",
    true,
    24
  );
  Object.defineProperty(effect, "y", { get: () => 721 + Math.sin(frameCount / 10) / 2 });
  effect.textColour = "#f00";

  createParticleEmitter(
    ["how-to-play"],
    [],
    1500,
    722,
    0,
    1,
    {
      type: "vfx.particle",
      cone: 360,
      maxXOffset: 30,
      maxYOffset: 0,
      amount: 6,
      particle: {
        //All
        lifetime: 90,
        speed: 0.4,
        decel: 0.005,
        rotateSpeed: 0,
        moveWithBackground: false,
        shape: "circle",
        widthFrom: 40,
        widthTo: 50,
        colourFrom: [255, 0, 0, 4],
        colourTo: [255, 0, 0, 0],
      },
    },
    5
  );

  let s = createUIComponent(
    ["how-to-play"],
    [],
    990,
    595,
    0,
    0,
    "none",
    null,
    "Shoot them all.",
    false,
    90
  );
  s.getActivity = () =>
    ui.mouse.x > 1475 && ui.mouse.y > 715 && ui.mouse.x < 1540 && ui.mouse.y < 730;
  s.textColour = "#ff000005";
})();

////////////////////////////////////////////////////

createUIComponent(
    ["how-to-play"],
    [],
    960,
    50,
    0,
    0,
    "none",
    null,
    "How to Play",
    false,
    60
  ).textColour = "#fff";
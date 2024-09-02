//    New Game Menu 'new-game'
UIComponent.setCondition("difficulty:none")
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
  50,
  value => UIComponent.setCondition("difficulty:"+value)
);
UIComponent.setCondition("mode:none")
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
  50,
  value => UIComponent.setCondition("mode:"+value)
);
UIComponent.setCondition("saveslot:none")
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
  50,
  value => UIComponent.setCondition("saveslot:"+value)
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
  ["ap1-slot:1|2", "ap2-slot:1|2", "ap3/4-slot:1|2", "ap5-slot:1|2"],
  960,
  900,
  400,
  100,
  "none",
  () => {
    ui.menuState = "in-game"
  },
  "Start!",
  false,
  60
)
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
)
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
)
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
)
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
)
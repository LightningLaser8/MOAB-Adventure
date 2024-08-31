//    New Game Menu 'new-game'
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
  [],
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
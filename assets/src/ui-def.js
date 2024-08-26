function createUIComponent(
  screens = [],
  x = 0,
  y = 0,
  width = 1,
  height = 1,
  bevel = "none",
  onpress = null,
  shownText = "",
  shownTextSize = 20
) {
  //Make component
  const component = generateUIComponent(x, y, width, height, bevel, onpress ?? (() => {}), shownText, shownTextSize)
  //Set conditional things
  component.acceptedScreens = screens
  component.isInteractive = !!onpress
  //Add to game
  ui.components.push(component)
}

//   Title Screen

//Play button on title screen
createUIComponent(
  ["title"],
  960,
  870,
  350,
  100,
  "none",
  () => {
    ui.menuState = "start-menu";
  },
  "Play",
  60
);


//   Start Menu

//Start menu background and header
createUIComponent(["start-menu"], 960, 540, 700, 700);
createUIComponent(
  ["start-menu"],
  960,
  220,
  1000,
  75,
  "none",
  undefined,
  "         Select Option",
  50
);
//Back to title screen button
createUIComponent(
  ["start-menu"],
  570,
  222,
  200,
  50,
  "none",
  () => {
    ui.menuState = "title";
  },
  "< Back",
  30
);

//Options Buttons
createUIComponent(
  ["start-menu"],
  960,
  700,
  400,
  80,
  "none",
  () => {
    ui.menuState = "options";
  },
  "Options",
  40
);
createUIComponent(
  ["start-menu"],
  960,
  400,
  400,
  80,
  "none",
  () => {
    ui.menuState = "new-game";
  },
  "New Game",
  40
);
createUIComponent(
  ["start-menu"],
  960,
  550,
  400,
  80,
  "none",
  undefined, //Decorative element - auto click suppression
  "Load Game",
  36
);
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
//Start menu background and header
createUIComponent(["start-menu"], 960, 540, 1000, 900);
createUIComponent(
  ["start-menu"],
  960,
  120,
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
  122,
  200,
  50,
  "none",
  () => {
    ui.menuState = "title";
  },
  "< Back",
  30
);

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
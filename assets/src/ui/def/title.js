//   Title Screen 'title-screen'

createUIImageComponent(
  ["title"],
  [],
  960,
  540,
  1120,
  420,
  null,
  images.screen.title,
  false
);

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

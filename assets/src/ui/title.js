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
Object.defineProperty(
  UIComponent.alignLeft(
    createUIComponent(
      ["title", "options", "start-menu", "new-game", "weapon-slots"],
      [],
      10,
      1050,
      0,
      0,
      "none",
      null,
      "ERROR",
      true,
      30
    )
  ),
  "text",
  {
    get: () =>
      (
        "v" +
        gameVersion +
        (isPreview ? " (preview)" : "") +
        (window.location.origin !== "https://lightninglaser8.github.io"
          ? " - Development Version"
          : "")
      ).substring(0, Math.floor((frameCount ?? 0) / 10)),
  }
);

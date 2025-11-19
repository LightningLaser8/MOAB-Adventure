ui.keybinds.shortcut.simple("back", "Escape", () => {
  for (let v of ui.components) {
    if (v.isBackButton && v.active) {
      v.press();
      break;
    }
  }
});

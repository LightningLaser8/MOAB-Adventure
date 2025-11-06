ui.keybinds.shortcut("back", "escape", {}, () => {
  for (let v of ui.components) {
    if (v.isBackButton && v.active) {
      v.press();
      break;
    }
  }
});

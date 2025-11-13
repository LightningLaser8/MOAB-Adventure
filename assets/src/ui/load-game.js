//Background, title, etc
//Start menu background and header
createUIComponent(["load-game"], [], 960, 540, 700, 700);
createUIComponent(
  ["load-game"],
  [],
  960,
  220,
  1000,
  75,
  "none",
  undefined,
  "         Load Game",
  false,
  50
);
//Back to title screen button
createUIComponent(
  ["load-game"],
  [],
  570,
  222,
  200,
  50,
  "none",
  () => {
    ui.menuState = "start-menu";
  },
  "< Back",
  false,
  30
);
function getSaveDescription(slot) {
  let sv = Serialiser.get("save." + slot);
  if (!sv) return "No data";
  return (
    (sv?.won
      ? "< Completed >"
      : Registry.worlds.get(sv?.world ?? "ocean-skies").name + ", Level " + (sv?.level ?? 0)) +
    "\n" +
    (sv?.difficulty ?? "easy").substring(0, 4).toUpperCase() +
    "-" +
    (sv?.mode ?? "adventure").substring(0, 3).toUpperCase() +
    " | S:" +
    shortenedNumber(sv?.shards) +
    " B:" +
    shortenedNumber(sv?.bloonstones)
  );
}
let ss = [];
for (let i = 0; i < 6; i++) {
  ss.push({
    info: createUIComponent(
      ["load-game"],
      [],
      890,
      330 + 100 * i,
      500,
      75,
      "none",
      null,
      "please wait...",
      true,
      30
    ),
    deleter: createUIComponent(
      ["load-game"],
      [],
      1220,
      330 + 100 * i,
      120,
      75,
      "none",
      () => deleteGame(i),
      "Delete",
      true,
      30
    ),
  });
}

function regenSaveDescrs() {
  ss.forEach((slot, i) => {
    let available = !!Serialiser.get("save." + i);
    slot.info.text = i + " | " + getSaveDescription(i);
    slot.info.press = available
      ? () => {
          ui.menuState = "in-game";
          UIComponent.setCondition("saveslot:" + i);
          game.saveslot = i;
          createPlayer();
          createSupport();
          loadGame(i);
        }
      : () => {};
    slot.deleter.interactive =
      slot.deleter.isInteractive =
      slot.info.interactive =
      slot.info.isInteractive =
        available;
    slot.deleter.text = available ? "Delete" : "...";
    if (!available) {
      slot.info.outlineColour = [50, 50, 50];
      slot.deleter.outlineColour = [50, 50, 50];
    }
  });
}
regenSaveDescrs();

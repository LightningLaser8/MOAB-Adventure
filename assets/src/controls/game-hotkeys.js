game.keybinds.shortcut("pause", "p", {}, () => {
  if (game.paused) unpause();
  else pause();
});

game.keybinds.shortcut("boost", " ", {}, () => {
  if (game.player.blimp.hasBooster) game.player.weaponSlots[5]?.weapon?.fire();
});

for (let k of [1, 2, 3, 4, 5]) {
  game.keybinds.shortcut("upgrade-ap" + k, k, { alt: true }, () => {
    if (UIComponent.evaluateCondition("is-ap" + k + "-available:true")) {
      if (game.player.weaponSlots[+k - 1].attemptUpgrade()) notifyEffect("Upgraded AP" + k);
      else if (
        game.player.weaponSlots[+k - 1].tier < game.player.weaponSlots[+k - 1].upgrades.length
      )
        notifyEffect("AP" + k + " upgrade is too expensive");
      else notifyEffect("Maximum AP" + k + " tier reached");
    } else notifyEffect("AP" + k + " is not available");
  });
}
game.keybinds.shortcut("upgrade-booster", "b", { alt: true }, () => {
  if (UIComponent.evaluateCondition("is-booster-available:true")) {
    if (game.player.weaponSlots[5].attemptUpgrade()) notifyEffect("Upgraded Booster");
    else if (game.player.weaponSlots[5].tier < game.player.weaponSlots[5].upgrades.length)
      notifyEffect("Booster upgrade is too expensive");
    else notifyEffect("Maximum Booster tier reached");
  } else notifyEffect("Booster is not available");
});
game.keybinds.shortcut("upgrade-blimp-primary", "n", { alt: true }, () => {
  let upgrade = game.player.blimp.path1;
  if (!upgrade || upgrade === "none") {
    notifyEffect("Blimp has no primary path upgrade");
    return false;
  }
  let blimp = Registry.blimps.get(upgrade);
  //Check cost and buy
  let shards = blimp?.cost?.shards ?? 0,
    bloonstones = blimp?.cost?.bloonstones ?? 0;
  if (shards <= game.shards && bloonstones <= game.bloonstones) {
    game.shards -= shards;
    game.bloonstones -= bloonstones;
    game.player.upgrade(upgrade);
    notifyEffect("Upgraded blimp along primary path");
  } else notifyEffect("Blimp primary upgrade is too expensive");
});
game.keybinds.shortcut("upgrade-blimp-secondary", "m", { alt: true }, () => {
  let upgrade = game.player.blimp.path2;
  if (!upgrade || upgrade === "none") {
    notifyEffect("Blimp has no alternative path upgrade");
    return false;
  }
  let blimp = Registry.blimps.get(upgrade);
  //Check cost and buy
  let shards = blimp?.cost?.shards ?? 0,
    bloonstones = blimp?.cost?.bloonstones ?? 0;
  if (shards <= game.shards && bloonstones <= game.bloonstones) {
    game.shards -= shards;
    game.bloonstones -= bloonstones;
    game.player.upgrade(upgrade);
    notifyEffect("Upgraded blimp along alternative path");
  } else notifyEffect("Blimp alternative upgrade is too expensive");
});

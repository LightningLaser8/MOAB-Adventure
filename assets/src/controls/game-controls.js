game.keybinds.control("move-up", "w", {}, () => {
  if (game.player.y > game.player.hitSize) {
    //If 'W' pressed
    game.player.y -= game.player.speed;
  }
});
game.keybinds.control("move-left", "a", {}, () => {
  if (game.player.x > game.player.hitSize) {
    //If 'A' pressed
    game.player.x -= game.player.speed * 1.5;
  }
});
game.keybinds.control("move-down", "s", {}, () => {
  if (game.player.y < 1080 - game.player.hitSize) {
    //If 'S' pressed
    game.player.y += game.player.speed;
  }
});
game.keybinds.control("move-right", "d", {}, () => {
  if (game.player.x < 1920 - game.player.hitSize) {
    //If 'D' pressed
    game.player.x += game.player.speed * 0.67;
  }
});
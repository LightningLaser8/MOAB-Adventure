const game = {
  //Game options
  difficulty: "normal",
  mode: "adventure",
  saveslot: 1,
  //Control type
  control: "keyboard",
  /** @type {Entity | null} Player entity */
  player: null,
  //Currency
  shards: 0,
  bloonstones: 0,
  level: 1,
  bosstimer: 300,
  bossinterval: 300,
  paused: false,
};
const difficulty = {
  easy: {
    spawnRateLowTier: 0.75,
    spawnRateHighTier: 0.67,
    boxHP: 0.85,
    bossHP: 0.85,
  },
  normal: {
    spawnRateLowTier: 1,
    spawnRateHighTier: 1,
    boxHP: 1,
    bossHP: 1,
  },
  hard: {
    spawnRateLowTier: 1.3,
    spawnRateHighTier: 2,
    boxHP: 1.25,
    bossHP: 1.3,
  },
};
/** @type {World} */
let world;
moveToWorld("ocean-skies");
//Initial values for canvas width and height
const baseWidth = 1920;
const baseHeight = 1080;
//scale everything
let contentScale = 1;

//Get the biggest possible canvas that fits on the current screen, preserving aspect ratio
function getCanvasDimensions(baseWidth, baseHeight) {
  const aspectRatio = baseWidth / baseHeight;
  let [canvasWidth, canvasHeight] = [windowWidth, windowHeight];
  let [widthRatio, heightRatio] = [
    canvasWidth / baseWidth,
    canvasHeight / baseHeight,
  ];
  if (widthRatio < heightRatio) {
    [canvasWidth, canvasHeight] = [windowWidth, windowWidth / aspectRatio];
    contentScale = canvasWidth / baseWidth;
  } else {
    [canvasWidth, canvasHeight] = [windowHeight * aspectRatio, windowHeight];
    contentScale = canvasHeight / baseHeight;
  }
  return [canvasWidth, canvasHeight];
}

let fonts = {};
let backgroundGradient;

async function preload() {
  await Registry.images.forEachAsync(async (name, item) => {
    await item.load();
  });
  await Registry.sounds.forEachAsync(async (name, item) => {
    await item.load();
    item.sound.playMode("restart");
  });
  fonts.ocr = await loadFont("assets/font/ocr_a_extended.ttf");
  fonts.darktech = await loadFont("assets/font/darktech_ldr.ttf");
  await userStartAudio();
}
//Set up the canvas, using the previous function
function setup() {
  try {
    createCanvas(...getCanvasDimensions(baseWidth, baseHeight));
    backgroundGradient = createGraphics(1, 100);
    for (let y = 0; y < 100; y++) {
      //For each vertical unit
      let col = [0, (200 * y) / 100, (255 * y) / 100]; //Get colour interpolation
      backgroundGradient.noStroke(); //Remove outline
      backgroundGradient.fill(col); //Set fill colour to use
      backgroundGradient.rect(0, y, 2, 1); //Draw the rectangle
    }
    rectMode(CENTER);
    imageMode(CENTER);
    textFont(fonts.darktech);
  } catch (e) {
    crash(e);
  }
}
//Change the size if the screen size changes
function windowResized() {
  resizeCanvas(...getCanvasDimensions(baseWidth, baseHeight));
}

//p5's draw function - called 60 times per second
function draw() {
  try {
    clear();
    scale(contentScale);
    image(backgroundGradient, 960, 540, 1920, 1080);
    if (world) {
      if (ui.menuState === "in-game") {
        background.draw();
        gameFrame();
      }
      uiFrame();
      if (!ui.waitingForMouseUp) fireIfPossible();
    }
    if (!game.paused) Timer.main.tick();
  } catch (e) {
    crash(e);
  }
}

function uiFrame() {
  //Tick, then draw the UI
  updateUIActivity();
  tickUI();
  drawUI();
  //Reset mouse held status
  if (ui.waitingForMouseUp && !mouseIsPressed) ui.waitingForMouseUp = false;
  if (keyIsDown(SHIFT)) showMousePos();
}

function gameFrame() {
  if (!game.paused) {
    movePlayer();
    world.tickAll();
    tickBossEvent();
    checkBoxCollisions();
  }
  world.drawAll();
}

function tickBossEvent() {
  UIComponent.setCondition("boss:" + (world.getFirstBoss() ? "yes" : "no")); // Update condition
  if (UIComponent.evaluateCondition("boss:no")) {
    // If there's no boss active
    if (game.bosstimer <= 0) {
      //If timer has run out
      game.bosstimer = game.bossinterval; //Reset timer
      world.nextBoss();
      world.reducedSpawns = true;
    } else {
      game.bosstimer -= game.player.speed * 0.0167;
      if (world.reducedSpawns) world.reducedSpawns = false;
    }
  }
}

function movePlayer() {
  if (keyIsDown(87) && game.player.y > game.player.hitSize) {
    //If 'W' pressed
    game.player.y -= game.player.speed;
  }
  if (keyIsDown(83) && game.player.y < 1080 - game.player.hitSize) {
    //If 'S' pressed
    game.player.y += game.player.speed;
  }
  if (keyIsDown(65) && game.player.x > game.player.hitSize) {
    //If 'A' pressed
    game.player.x -= game.player.speed * 1.5;
  }
  if (keyIsDown(68) && game.player.x < 1920 - game.player.hitSize) {
    //If 'D' pressed
    game.player.x += game.player.speed * 0.5;
  }
  //If the player is out of bounds, then damage rapidly
  if (game.player.x > 1920 - game.player.hitSize + game.player.speed * 2) {
    game.player.x -= game.player.speed * 4;
    game.player.damage("out-of-bounds", game.player.maxHealth * 0.0125);
  }
  if (game.player.x < game.player.hitSize - game.player.speed * 4) {
    game.player.x += game.player.speed * 4;
    game.player.damage("out-of-bounds", game.player.maxHealth * 0.0125);
  }
  if (game.player.y < game.player.hitSize - game.player.speed * 3) {
    game.player.y += game.player.speed * 4;
    game.player.damage("out-of-bounds", game.player.maxHealth * 0.0125);
  }
  if (game.player.y > 1080 - game.player.hitSize + game.player.speed * 3) {
    game.player.y -= game.player.speed * 4;
    game.player.damage("out-of-bounds", game.player.maxHealth * 0.0125);
  }
  //regen
  if (game.player.health < game.player.maxHealth) {
    game.player.heal(0.0003 * game.player.maxHealth);
  }
}

function updateUIActivity() {
  //Check each component, but only do it once.
  for (let component of ui.components) {
    component.updateActivity();
  }
}

function drawUI() {
  background.image = world.background;
  for (let component of ui.components) {
    if (component.active) {
      component.draw();
    }
  }
}

function tickUI() {
  if (!game.paused) background.tick(game.player?.speed ?? 0);
  for (let component of ui.components) {
    if (component.active && component.isInteractive) {
      component.checkMouse();
    }
  }
}

function showMousePos() {
  push();
  textAlign(CENTER, CENTER);
  textFont(fonts.ocr);
  fill(255);
  stroke(0);
  strokeWeight(2);
  textSize(40);
  text(
    "X:" + Math.round(ui.mouse.x) + " Y:" + Math.round(ui.mouse.y),
    ui.mouse.x,
    ui.mouse.y - 50
  );
  stroke(255);
  strokeWeight(2);
  line(ui.mouse.x - 20, ui.mouse.y, ui.mouse.x + 20, ui.mouse.y);
  line(ui.mouse.x, ui.mouse.y - 20, ui.mouse.x, ui.mouse.y + 20);
  pop();
}

function createPlayer() {
  let player = construct(Registry.entities.get("player"));
  //Add all slots: not all of them will be accessible
  player.addWeaponSlot(getSelectedAP(1));
  player.addWeaponSlot(getSelectedAP(2));
  player.addWeaponSlot(getSelectedAP(3));
  player.addWeaponSlot(getSelectedAP(4));
  player.addWeaponSlot(getSelectedAP(5));
  player.addToWorld(world);
  game.player = player;
  //is moab
  player.upgrade("moab");
  //Change to an accessor property
  Object.defineProperty(player, "target", {
    get: () => {
      return ui.mouse;
    }, //This way, I only have to set it once.
  });
  world.particles.push(
    new WaveParticle(
      player.x,
      player.y,
      120,
      0,
      1920,
      [255, 0, 0],
      [255, 0, 0, 0],
      100,
      0
    )
  );
}

function fireIfPossible() {
  if (ui.menuState === "in-game" && mouseIsPressed) {
    for (let slot of game.player.weaponSlots) {
      if (slot.weapon) slot.weapon.fire();
    }
  }
}

function checkBoxCollisions() {
  for (let entity of world.entities) {
    //If player is colliding with a living entity on a different team that is a box
    if (
      entity instanceof Box &&
      !entity.dead &&
      entity.team !== game.player.team &&
      game.player.collidesWith(entity)
    ) {
      game.player.damage("collision", entity.health, entity);
      //If the player didn't die i.e. resisted, shielded, had more HP, etc.
      if (!game.player.dead) {
        //Remove box
        entity.dead = true;
      }
    }
  }
  if (game.player.dead) {
    playerDies();
  }
}

function playerDies() {
  playSound("player-death");
  deathStats.shardCounter.text = "Shards: " + shortenedNumber(game.shards);
  deathStats.bloonstoneCounter.text =
    "Bloonstones: " + shortenedNumber(game.bloonstones);
  deathStats.progress.text = "Zone: " + world.name + " | Level " + game.level;
  deathStats.damageDealt.text =
    "Damage Dealt: " + shortenedNumber(game.player.damageDealt);
  deathStats.damageTaken.text =
    "Damage Taken: " + shortenedNumber(game.player.damageTaken);
  deathStats.destroyedBoxes.text =
    "Boxes Destroyed: " + shortenedNumber(game.player.destroyed.boxes);
  deathStats.destroyedBosses.text =
    "Bosses Destroyed: " + shortenedNumber(game.player.destroyed.bosses);
  ui.menuState = "you-died";
  //Reset world and game
  reset();
}

function playerWins() {
  winStats.shardCounter.text = "Shards: " + shortenedNumber(game.shards);
  winStats.bloonstoneCounter.text =
    "Bloonstones: " + shortenedNumber(game.bloonstones);
  winStats.damageDealt.text =
    "Damage Dealt: " + shortenedNumber(game.player.damageDealt);
  winStats.damageTaken.text =
    "Damage Taken: " + shortenedNumber(game.player.damageTaken);
  winStats.destroyedBoxes.text =
    "Boxes Destroyed: " + shortenedNumber(game.player.destroyed.boxes);
  winStats.destroyedBosses.text =
    "Bosses Destroyed: " + shortenedNumber(game.player.destroyed.bosses);
  ui.menuState = "you-win";
  //Reset world and game
  reset();
}

function reset() {
  world.entities.splice(0);
  world.particles.splice(0);
  world.bullets.splice(0);
  game.bloonstones = 0;
  game.shards = 0;
  game.level = 1;
  unpause();
  game.bosstimer = game.bossinterval;

  for (let slot of game.player.weaponSlots) {
    slot.clear(); //Remove any weapons
  }
  moveToWorld("ocean-skies");

  //garbage collect player
  game.player = null;
}

//Triggers on any key press
function keyPressed() {
  if (key.toLowerCase() === "p") {
    //Pause / unpause
    if (game.paused) unpause();
    else pause();
  }
  if (key.toLowerCase() === "f12") {
    return true;
  }
  if (key.toLowerCase() === "f11") {
    //finally
    return true;
  }
  return false; //Prevent any default behaviour
}

function pause() {
  game.paused = true;
  pauseSound(world.bgm);
}

function unpause() {
  game.paused = false;
  playSound(world.bgm, true);
}

function moveToWorld(worldName = "ocean-skies") {
  if (world?.bgm) stopSound(world.bgm);
  //Construct registry item as a new World.
  let newWorld = construct(Registry.worlds.get(worldName), World);
  //If the player exists
  if (game.player) {
    //Put them in it
    game.player.addToWorld(newWorld);
    //Reset player position
    game.player.x = 200;
    game.player.y = 540;
  }

  //Set the game's world to the new one. The old one will be garbage collected.
  world = newWorld;
  //Make the flash effect
  worldTransitionEffect(world.name);
}

function reload() {
  noLoop();
  loop();
}

class World {
  particles = [];
  /** @type {Array<Entity>} */
  entities = [];
  /** @type {Array<Bullet>} */
  bullets = [];
  spawning = [];
  background = "background.sea";
  name = "World";
  boss = null;
  reducedSpawns = false;
  #bossList = [];
  #currentBossIndex = 0;

  //Sounds!
  bgm = null; //Background Music
  ambientSound = null; //Played randomly
  ambienceChance = 0.001; //Chance per frame to play ambientSound

  constructor(name = "World", background = "background.sea", bgm = null) {
    this.name = name;
    this.background = background;
    this.bgm = bgm;
  }
  tickAll() {
    this.#actualTick();
    this.#removeDead();
    this.tickSpawns(game.player.speed);
    if (Math.random() < this.ambienceChance) {
      playSound(this.ambientSound);
    }
    playSound(this.bgm, true);
  }
  #actualTick() {
    //Tick *everything*
    for (let bullet of this.bullets) {
      bullet.step(1);
    }
    for (let particle of this.particles) {
      particle.step(1);
    }
    for (let entity of this.entities) {
      entity.tick();
    }
  }
  #removeDead() {
    //THEN remove dead stuff
    let len = this.bullets.length;
    for (let b = 0; b < len; b++) {
      if (this.bullets[b]?.remove) {
        let bullet = this.bullets[b];
        for (let instance of bullet.damage) {
          if (instance.area)
            //If it explodes
            splashDamageInstance(
              bullet.x,
              bullet.y,
              instance.amount +
                (bullet.source ? bullet.source.getDVScale() : 0) +
                (instance.levelScaling ?? 0) * game.level,
              instance.type,
              instance.area,
              bullet.entity,
              instance.visual, //        \
              instance.sparkColour, //   |
              instance.sparkColourTo, // |
              instance.smokeColour, //   |- These are optional, but can be set per instance
              instance.smokeColourTo, // |
              instance.waveColour, //     /
              bullet.status,
              bullet.statusDuration,
              instance.bossDamageMultiplier ?? 1
            );
          if (instance.blinds) {
            blindingFlash(
              bullet.x,
              bullet.y,
              instance.blindOpacity,
              instance.blindDuration,
              instance.glareSize
            );
          }
        }
        bullet.frag();
        //Sound time!
        playSound(bullet.despawnSound);
        //Delete the bullet
        this.bullets.splice(b, 1);
      }
    }
    len = this.particles.length;
    for (let p = 0; p < len; p++) {
      if (this.particles[p]?.remove) {
        this.particles.splice(p, 1);
      }
    }
    len = this.entities.length;
    for (let e = 0; e < len; e++) {
      let entity = this.entities[e];
      if (entity?.dead) {
        if (entity?.isBoss) {
          game.level++;
        }
        playSound(entity.deathSound);
        this.entities.splice(e, 1);
      }
    }
    //No search algorithms => faster
  }
  drawAll() {
    for (let entity of this.entities) {
      entity.draw();
    }
    for (let bullet of this.bullets) {
      bullet.draw();
    }
    for (let particle of this.particles) {
      particle.draw();
    }
  }
  tickSpawns(dt) {
    for (let spawnGroup of this.spawning) {
      if (spawnGroup.$currentCooldown <= 0) {
        let ent = construct(spawnGroup.entity, Entity);
        ent.addToWorld(this);
        spawnGroup.$currentCooldown = spawnGroup.interval;
      } else {
        spawnGroup.$currentCooldown -= dt * (this.reducedSpawns ? 0.33 : 1);
      }
    }
  }
  addSpawn(spawn = { entity: Box.default, interval: 60 }, isHighTier = false) {
    //Handle bad properties like `null`
    spawn.entity ??= Box.default;
    spawn.interval ??= 60;
    //Apply difficulty rules
    spawn.interval /=
      difficulty[game.difficulty][
        isHighTier ? "spawnRateHighTier" : "spawnRateLowTier"
      ] ?? 1;
    //Add group
    spawn.$currentCooldown = 0;
    this.spawning.push(spawn);
  }
  spawnBoss(entity, bossClass = "o") {
    //bossClass shows a letter on the square part of the bossbar
    let ent = construct(entity, Entity); //Construct entity
    ent.class = bossClass;
    ent.isBoss = true; //boss is made of boss
    UIComponent.setCondition("boss:yes"); //There is, in fact, a boss.
    ent.addToWorld(this); //Add entity
  }
  getFirstBoss() {
    for (let entity of this.entities) {
      if (entity.isBoss && !entity.hidden) return entity;
    }
    return null;
  }
  setBossList(...bosses) {
    this.#bossList = bosses;
  }
  nextBoss() {
    this.spawnBoss(
      Registry.entities.get(this.#bossList[this.#currentBossIndex])
    );
    this.#currentBossIndex++;
    if (this.#currentBossIndex >= this.#bossList.length)
      this.#currentBossIndex = 0;
  }
}

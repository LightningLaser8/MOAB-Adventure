class World{
  particles = []
  /** @type {Array<Entity>} */
  entities = []
  /** @type {Array<Bullet>} */
  bullets = []
  spawning = []
  background = images.background.sea
  name = "World"
  constructor(name = "World", background = images.background.sea){
    this.name = name
    this.background = background
  }
  tickAll(){
    this.#actualTick()
    this.#removeDead()
    this.tickSpawns(game.player.speed)
  }
  #actualTick(){
    //Tick *everything*
    for(let bullet of this.bullets){
      bullet.step(1)
    }
    for(let particle of this.particles){
      particle.step(1)
    }
    for(let entity of this.entities){
      entity.tick()
    }
  }
  #removeDead(){
    //THEN remove dead stuff
    let len = this.bullets.length
    for(let b = 0; b < len; b++){
      if(this.bullets[b]?.remove){
        this.bullets[b].frag()
        this.bullets.splice(b, 1)
      }
    }
    len = this.particles.length
    for(let p = 0; p < len; p++){
      if(this.particles[p]?.remove){
        this.particles.splice(p, 1)
      }
    }
    len = this.entities.length
    for(let e = 0; e < len; e++){
      if(this.entities[e]?.dead){
        this.entities.splice(e, 1)
      }
    }
    //No search algorithms => faster
  }
  drawAll(){
    for(let entity of this.entities){
      entity.draw()
    }
    for(let bullet of this.bullets){
      bullet.draw()
    }
    for(let particle of this.particles){
      particle.draw()
    }
  }
  tickSpawns(dt){
    for(let spawnGroup of this.spawning){
      if(spawnGroup.$currentCooldown <= 0){
        construct(spawnGroup.entity).addToWorld(this)
        spawnGroup.$currentCooldown = spawnGroup.interval
      }
      else{
        spawnGroup.$currentCooldown -= dt
      }
    }
  }
  addSpawn(spawn = {entity: Box.default, interval: 60}){
    //Handle bad properties like `null`
    spawn.entity ??= Box.default
    spawn.interval ??= 60
    //Add group
    spawn.$currentCooldown = 0
    this.spawning.push(spawn)
  }
}
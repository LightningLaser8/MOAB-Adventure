class World{
  particles = []
  entities = []
  bullets = []
  background = images.background.sea
  constructor(background = images.background.sea){
    this.background = background
  }
  tickAll(){
    this.#actualTick()
    this.#removeDead()
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
      if(this.entities[e]?.remove){
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
}
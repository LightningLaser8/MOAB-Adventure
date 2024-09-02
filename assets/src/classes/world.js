class World{
  particles = []
  entities = []
  bullets = []
  background = images.background.sea
  constructor(background = images.background.sea){
    this.background = background
  }
  tickAll(){
    for(let bullet of this.bullets){
      bullet.tick()
    }
    for(let particle of this.particles){
      particle.tick(1)
    }
    for(let entity of this.entities){
      entity.tick()
    }
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
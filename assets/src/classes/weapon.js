class Weapon{
  meta = { //Metadata - mostly edited by the game itself, not the programmer
    entity: null, //will be the player, unless it's a boss weapon - DON'T PRE-SET THIS
    source: "custom", //Source
    posX: 0, //X on player
    posY: 0 //Y on player
  }
  reload = 30
  barrel = 0
  parts = []
  shoot = {
    bullet: null,
    pattern: {
      spread: 0,
      amount: 1,
      spacing: 0
    }
  }
  /**Rotation in degrees */
  rotation = 0
  //Internal
  #delay = 0
  #cooldown = 0
  constructor(){}
  get rotationRadians(){
    return (this.rotation)/180 * Math.PI
  }
  init(){
    let np = []
    for(let p of this.parts){
      np.push(construct(p))
    }
    this.parts = np
  }
  draw(){
    for(let p of this.parts){
      p.draw?p.draw(this):{}
    }
  }
  tick(){
    if(this.meta.entity){
      this.x = this.meta.entity.x + this.meta.posX
      this.y = this.meta.entity.y + this.meta.posY
    }
  }
}
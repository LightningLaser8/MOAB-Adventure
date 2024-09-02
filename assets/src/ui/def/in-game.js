const background = {
  bg1: new ImageUIComponent(
    960,
    540,
    1920,
    1080,
    null,
    images.background.sea,
    false
  ),
  bg2: new ImageUIComponent(
    960 * 3 - 4,
    540,
    1920,
    1080,
    null,
    images.background.sea,
    false
  ),
  draw(){
    this.bg1.draw()
    this.bg2.draw()
  },
  tick(dt){
    this.bg1.x -= dt
    this.bg2.x -= dt
    if(this.bg2.x <= 956){
      this.bg1.x += 1920
      this.bg2.x += 1920
    }
  },
  get image(){
    return this.bg2.image;
  },
  set image(_){
    this.bg1.image = this.bg2.image = _
  }
}
class CriticalBullet extends Bullet{
  critChance = 0;
  //Like fragBullet, but for crits
  critBullet = {};
  //If not crit
  normalBullet = {};
  #checked = false;
  draw(){}
  step(dt){
    //On the first step
    if(this.world && !this.#checked){
      this.#checked = true;
      //If a critical hit
      if(rnd(0, 1) < this.critChance){
        //Expel critical bullet
        patternedBulletExpulsion(
          this.x,
          this.y,
          this.critBullet,
          1,
          this.direction,
          0,
          0,
          this.world,
          this.entity,
          this.source
        )
      }
      else{
        //Expel normal bullet
        patternedBulletExpulsion(
          this.x,
          this.y,
          this.normalBullet,
          1,
          this.direction,
          0,
          0,
          this.world,
          this.entity,
          this.source
        )
      }
      //Delete self
      this.remove = true;
    }
  }
}
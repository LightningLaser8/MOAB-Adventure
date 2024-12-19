class BossAction {
  duration = 1;
  /**
   * @param {Entity} entity 
   */
  execute(entity) {} //Called once, on the first frame of this action
  /**
   * @param {Entity} entity 
   */
  tick(entity) {} //Called every frame of this action
}
class MovementAction extends BossAction {
  x = 0;
  y = 0;
  rot = 0;
  tick(entity) {
    entity.x += this.x / this.duration
    entity.y += this.y / this.duration
    entity.direction += this.rot / this.duration
  }
}
class FireWeaponAction extends BossAction{
  slotIndex = 0;
  execute(entity){
    if(entity.weaponSlots[this.slotIndex]?.weapon)
    entity.weaponSlots[this.slotIndex].weapon.fire()
  }
}
class ExitAction extends BossAction{
  execute(entity){
    entity.hidden = true; //Stops bossbar finding it
    entity.oldX = entity.x //Store old x for returning to
    entity.x = 32862587632756 //Put wayyyy offscreen
  }
}
class EntryAction extends BossAction{
  execute(entity){
    entity.hidden = false; //Lets bossbar find it again
    entity.x = entity.oldX??1 //Return to old x
  }
}
class RegenAction extends BossAction{
  amount = 0
  tick(entity){
    entity.heal((this.amount / this.duration)||this.amount)
  }
}
class SelfDestructAction extends BossAction{
	damage = 100
	damageRadius = 200
	damageType = "explosion"
  sparkColour = [255, 245, 215, 255] //The colour the sparks start at
  sparkColourTo = [255, 215, 0, 55] //The colour the sparks go to
  smokeColour = [100, 100, 100, 200] //The colour the smoke starts at
  smokeColourTo = [100, 100, 100, 0] //The colour the smoke goes to
  waveColour = [255, 128, 0, 0] //The colour the wave ends at. It always starts white.
	blinds = false
	blindOpacity = 0
	blindDuration = 0
	glareSize = 0
	givesRewards = true
  execute(entity){
    entity.dead = true
    splashDamageInstance(
      entity.x,
      entity.y,
      this.damage,
      this.damageType,
      this.damageRadius,
      entity,
      true,
      this.sparkColour,
      this.sparkColourTo,
      this.smokeColour,
      this.smokeColourTo,
      this.waveColour
    )
    if(this.givesRewards){
      //Give destroy rewards if there's a difference, regular rewards if not
      game.shards += (entity.destroyReward??entity.reward)?.shards ?? 0
      game.bloonstones += (entity.destroyReward??entity.reward)?.bloonstones ?? 0
    }
  }
}
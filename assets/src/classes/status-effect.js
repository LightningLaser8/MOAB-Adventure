class StatusEffect {
  damage = 0;
  healing = 0;
  damageType = "normal";
  speedMult = 1;
  healthMult = 1;
  damageMult = 1;
  resistanceMult = 1;
  vfx = "none";
  vfxChance = 0.2;
  applyTo(entity, time) {
    entity.statuses.push({ effect: this, time: time, timeLeft: time });
  }
}

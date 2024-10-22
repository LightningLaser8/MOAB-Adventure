function splashDamageInstance(
  centreX = 0,
  centreY = 0,
  amount = 0,
  damageType = "explosion",
  damageRadius = 0,
  sourceEntity = null,
  showExplosion = true,
  sparkColour = [255, 245, 215, 255], //The colour the sparks start at
  sparkColourTo = [255, 215, 0, 55], //The colour the sparks go to
  smokeColour = [100, 100, 100, 200], //The colour the smoke starts at
  smokeColourTo = [100, 100, 100, 0], //The colour the smoke goes to
  waveColour = [255, 128, 0, 0], //The colour the wave ends at. It always starts white.
  status = "none",
  statusDuration = 0
) {
  //Most of these powers are just to make it less insane at high radii
  //They are tested repeatedly to make sure they look good
  let radius = damageRadius ** 1.05;
  if (showExplosion) {
    //Spawn smoke
    for (let i = 0; i < radius ** 0.6; i++) {
      world.particles.push(
        new ShapeParticle(
          centreX,
          centreY,
          radians(rnd(0, 360)),
          rnd(radius ** 0.65, radius ** 0.8 * 2),
          rnd(radius ** 0.25 * 0.3, radius ** 0.25 * 0.5),
          0.01,
          "circle",
          smokeColour,
          smokeColourTo,
          radius ** 0.85,
          0,
          radius ** 0.85,
          0,
          0,
          true
        )
      );
    }
    //Yellow sparks
    for (let i = 0; i < radius ** 0.7; i++) {
      world.particles.push(
        new ShapeParticle(
          centreX,
          centreY,
          radians(rnd(0, 360)),
          rnd(radius ** 0.75, radius ** 0.75 * 1.5),
          rnd(radius ** 0.25 * 0.1, radius ** 0.25 * 2),
          0.075,
          "rect",
          sparkColour,
          sparkColourTo,
          radius ** 0.5,
          0,
          radius ** 0.75,
          radius ** 0.5,
          0,
          true
        )
      );
    }
    world.particles.push(
      new WaveParticle(
        centreX,
        centreY,
        30,
        0,
        damageRadius,
        [255, 255, 255, 255],
        waveColour,
        radius ** 0.75,
        0,
        true
      )
    );
  }
  for (let e of world.entities) {
    if (
      ((centreX - e.x) ** 2 + (centreY - e.y) ** 2) ** 0.5 <=
        damageRadius + e.hitSize &&
      e.team !== sourceEntity.team
    ) {
      e.damage(damageType, amount, sourceEntity);
      if(status !== "none") e.applyStatus(status, statusDuration);
    }
  }
}
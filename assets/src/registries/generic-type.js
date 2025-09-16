//Add all normal types to the type registry.
Registry.genericType.add("bullet", Bullet);
Registry.genericType.add("weapon", Weapon);
Registry.genericType.add("part", Part);
Registry.genericType.add("entity", Entity);
Registry.genericType.add("box", Box);
Registry.genericType.add("shooting-box", AngryBox);
Registry.genericType.add("boss", Boss);
Registry.genericType.add("final-boss", FinalBoss);
Registry.genericType.add("world", World);
//Animations
Registry.genericType.add("animation", PartAnimation); //Who cares that the class is named something else?
Registry.genericType.add("infinite-animation", InfiniteAnimation);
Registry.genericType.add("loop-animation", LoopingAnimation);
Registry.genericType.add("bounce-animation", BounceAnimation);
Registry.genericType.add("recoil-animation", RecoilAnimation);
Registry.genericType.add("status-effect", StatusEffect);
//Bullets
Registry.genericType.add("missile-bullet", Missile);
Registry.genericType.add("continuous-laser-bullet", ContinuousLaserBullet);
Registry.genericType.add("laser-bullet", LaserBullet);
Registry.genericType.add("telegraph", LineTelegraph);
Registry.genericType.add("point-bullet", PointBullet);
Registry.genericType.add("chained-bullet", ChainedBullet);
Registry.genericType.add("radiation-zone", RadiationZone);
//Boss Actions
Registry.genericType.add("action.generic", BossAction);
Registry.genericType.add("action.move", MovementAction);
Registry.genericType.add("action.fire-weapon", FireWeaponAction);
Registry.genericType.add("action.self-destruct", SelfDestructAction);
Registry.genericType.add("action.exit", ExitAction);
Registry.genericType.add("action.entry", EntryAction);
Registry.genericType.add("action.regen", RegenAction);
Registry.genericType.add("action.summon", SummonMinionAction);
Registry.genericType.add("action.spawn-bullet", SpawnBulletAction);
Registry.genericType.add("action.change-speed", ChangeSpeedAction);
Registry.genericType.add("action.enable-ai", EnableAIAction);
Registry.genericType.add("action.disable-ai", DisableAIAction);
Registry.genericType.add("action.sequence", CollapsedSequenceAction);
Registry.genericType.add("action.multi", MultiAction);
//vfx
Registry.genericType.add("vfx.particle", ParticleEmissionEffect);
Registry.genericType.add("vfx.text", TextParticleEmissionEffect);
Registry.genericType.add("vfx.wave", WaveEmissionEffect);
Registry.genericType.add("vfx.multi", MultiEffect);

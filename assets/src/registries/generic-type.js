//Add all normal types to the type registry.
Registry.genericType.add("bullet", Bullet);
Registry.genericType.add("weapon", Weapon);
Registry.genericType.add("part", Part);
Registry.genericType.add("entity", Entity);
Registry.genericType.add("box", Box);
Registry.genericType.add("boss", Boss);
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
Registry.genericType.add("point-bullet", PointBullet);
Registry.genericType.add("radiation-zone", RadiationZone);
//Boss Actions
Registry.genericType.add("action", BossAction)
Registry.genericType.add("move-action", MovementAction)
Registry.genericType.add("fire-weapon-action", FireWeaponAction)
Registry.genericType.add("self-destruct-action", SelfDestructAction)
Registry.genericType.add("exit-action", ExitAction)
Registry.genericType.add("entry-action", EntryAction)
Registry.genericType.add("regen-action", RegenAction)

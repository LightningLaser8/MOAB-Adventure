Registry.statuses.add(
  "burning",
  construct({
    type: "status-effect",
    damage: 0.09,
    damageType: "fire",
  })
);
Registry.statuses.add(
  "freezing",
  construct({
    type: "status-effect",
    speedMult: 0.75,
    healthMult: 0.85,
    damageMult: 0.9,
    resistanceMult: 0.6,
  })
);
Registry.statuses.add(
  "irradiated",
  construct({
    type: "status-effect",
    speedMult: 0.975,
    healthMult: 0.975,
    damageMult: 0.975,
    resistanceMult: 0.975,
  })
);

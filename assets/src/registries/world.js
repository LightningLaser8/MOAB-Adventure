Registry.worlds.add("ocean-skies", {
  name: "Ocean Skies",
  bgm: "sky-high",
  background: "background.sea",
  spawning: [
    {
      entity: "wooden-box",
      interval: 60,
      isHighTier: false,
    },
    {
      entity: "metal-box",
      interval: 300,
      isHighTier: true,
    },
  ],
  bosses: [
    "gigantic-box",
    "monkey-ace",
    "super-monkey",
    "gigantic-box",
    "monkey-ace",
    "super-monkey",
    "gigantic-box",
    "monkey-ace",
    "super-monkey",
    "robo-monkey",
  ],
});
Registry.worlds.add("workshop", {
  name: "Workshop",
  bgm: "deconstruction",
  background: "background.conveyor",
  spawning: [
    {
      entity: "metal-box",
      interval: 80,
      isHighTier: false,
    },
    {
      entity: "wooden-box",
      interval: 300,
      isHighTier: false,
    },
  ],
});

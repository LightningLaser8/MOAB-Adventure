Registry.vfx.add("fire", {
  type: "vfx.particle",
  cone: 360,
  particle: {
    //All
    lifetime: 60,
    direction: 0,
    speed: 1,
    decel: 0.015,
    rotateSpeed: 0,
    moveWithBackground: false,
    shape: "circle",
    widthFrom: 20,
    widthTo: 30,
    heightFrom: 20,
    heightTo: 30,
    colourFrom: [50, 50, 50, 100],
    colourTo: [100, 100, 100, 0],
  }
})
Registry.vfx.add("fire", {
  type: "vfx.particle",
  cone: 360,
  particle: {
    //All
    lifetime: 60,
    direction: 0,
    speed: 1,
    decel: 0.02,
    rotateSpeed: 0,
    moveWithBackground: true,
    shape: "circle",
    widthFrom: 20,
    widthTo: 30,
    heightFrom: 20,
    heightTo: 30,
    colourFrom: [255, 255, 150, 100],
    colourTo: [255, 80, 20, 0],
  }
})
Registry.vfx.add("ice", {
  type: "vfx.particle",
  cone: 360,
  particle: {
    //All
    lifetime: 60,
    direction: 0,
    speed: 1,
    decel: 0.02,
    rotateSpeed: 0,
    moveWithBackground: true,
    shape: "rhombus",
    widthFrom: 15,
    widthTo: 20,
    heightFrom: 15,
    heightTo: 20,
    colourFrom: [255, 255, 255, 100],
    colourTo: [0, 100, 100, 0],
  }
})
Registry.vfx.add("radiation", {
  type: "vfx.particle",
  cone: 360,
  particle: {
    //All
    lifetime: 10,
    direction: 0,
    speed: 0.5,
    decel: 0.02,
    rotateSpeed: 0,
    moveWithBackground: true,
    shape: "circle",
    widthFrom: 50,
    widthTo: 50,
    heightFrom: 50,
    heightTo: 50,
    colourFrom: [0, 100, 0, 10],
    colourTo: [0, 80, 0, 0],
  }
})
Registry.vfx.add("red-polarity", {
  type: "vfx.particle",
  cone: 360,
  particle: {
    //All
    lifetime: 60,
    direction: 0,
    speed: 1,
    decel: 0.02,
    rotateSpeed: 0,
    moveWithBackground: true,
    shape: "rhombus",
    widthFrom: 15,
    widthTo: 20,
    heightFrom: 15,
    heightTo: 20,
    colourFrom: [255, 100, 100, 100],
    colourTo: [100, 10, 10, 0],
  }
})
Registry.vfx.add("blue-polarity", {
  type: "vfx.particle",
  cone: 360,
  particle: {
    //All
    lifetime: 60,
    direction: 0,
    speed: 1,
    decel: 0.02,
    rotateSpeed: 0,
    moveWithBackground: true,
    shape: "rhombus",
    widthFrom: 15,
    widthTo: 20,
    heightFrom: 15,
    heightTo: 20,
    colourFrom: [100, 100, 255, 100],
    colourTo: [10, 10, 100, 0],
  }
})
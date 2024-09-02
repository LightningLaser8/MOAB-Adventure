class Entity {
  x = 0;
  y = 0;
  direction = 0;
  /** @type {Array<Weapon>} */
  weapons = [];
  //Slots only for players
  weaponSlots = {
    ap1: null,
    ap2: null,
    ap3: null,
    ap4: null,
    ap5: null,
  };
  health = 100;
  maxHealth = 100;
  name = "Entity";
  world = null;
  resistances = [];
  //How the entity will be drawn
  drawer = {
    shape: "circle",
    fill: "red",
    image: images.env.error,
    width: 100,
    height: 100,
  };
  hitSize = 100;
  speed = 10;
  team = "enemy";
  constructor() {} //Because universal
  init(){
    this.health = this.maxHealth
  }
  addToWorld(world){
    world.entities.push(this)
    this.world = world
  }
  takeDamage(type = "normal", amount = 0) {
    this.health -= amount;
    if (this.health <= 0) {
      this.health = 0;
    }
  }
  addWeapon(weapon){
    this.weapons.push(weapon)
    weapon.meta.entity = this
  }
  tick() {
    //Tick weapons
    for(let weapon of this.weapons){
      weapon.tick()
    }
  }
  getClosestEnemy() { /*Don't actually need this yet*/ }
  draw() {
    if (this.drawer.image) {
      rotatedImg(
        this.drawer.image,
        this.x,
        this.y,
        this.drawer.width,
        this.drawer.height,
        this.direction
      );
    } else {
      //If no image, draw shape instead
      rotatedShape(
        this.drawer.shape,
        this.x,
        this.y,
        this.drawer.width,
        this.drawer.height
      );
    }
    //Draw weapons on top
    for(let weapon of this.weapons){
      weapon.draw()
    }
  }
}

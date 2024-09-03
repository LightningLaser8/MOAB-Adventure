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
  target = { x: 0, y: 0 };

  //Stats
  damageDealt = 0
  damageTaken = 0

  constructor() {} //Because universal
  init() {
    this.health = this.maxHealth;
  }
  addToWorld(world) {
    world.entities.push(this);
    this.world = world;
  }
  takeDamage(type = "normal", amount = 0) {
    this.damageTaken += amount
    this.health -= amount;
    if (this.health <= 0) {
      this.health = 0;
      this.dead = true;
    }
  }
  addWeapon(weapon) {
    this.weapons.push(weapon);
    weapon.meta.entity = this;
  }
  tick() {
    //Tick weapons
    for (let weapon of this.weapons) {
      weapon.tick();
    }
    this.checkBullets()
  }
  getClosestEnemy() {
    /*Don't actually need this yet*/
  }
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
    for (let weapon of this.weapons) {
      weapon.draw();
    }
  }
  collidesWith(obj) {
    return dist(this.x, this.y, obj.x, obj.y) <= this.hitSize + obj.hitSize;
  }
  checkBullets() {
    for (let bullet of this.world.bullets) {
      //If colliding with a bullet on different team, that it hasn't already been hit by and that still exists
      if (!bullet.remove && this.team !== bullet.entity.team && this.collidesWith(bullet) && !bullet.damaged.includes(this)) {
        //Take all damage instances
        for (let instance of bullet.damage) {
          this.takeDamage(instance.type, instance.amount);
          bullet.entity.damageDealt += instance.amount
        }
        //Make the bullet know
        bullet.damaged.push(this);
        //Reduce pierce
        bullet.pierce --
        //If exhausted
        if(bullet.pierce < 0){
          //Delete
          bullet.remove = true
        }
      }
    }
  }
}

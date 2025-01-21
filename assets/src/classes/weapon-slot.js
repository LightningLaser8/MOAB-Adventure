class WeaponSlot {
  upgrades = [];
  tier = 0;
  /** @type {Weapon} */
  weapon = null;
  posX = 0;
  posY = 0;
  /** @type {Entity} */
  entity = null;
  constructor(...upgrades) {
    //new WeaponSlot("upgrade1", "upgrade2", "upgrade3", ...)
    this.upgrades = upgrades;
  }
  /** Tries to upgrade the weapon slot. */
  attemptUpgrade() {
    if (!this.upgrades[this.tier]) return false; //Index 0 is tier 1, stop if no later upgrade
    let nextWeapon = Registry.weapons.get(this.upgrades[this.tier]); //Load next weapon from registry
    if(nextWeapon.cost){
      if (game.shards < nextWeapon.cost.shards) return false; //If not enough shards
      if (game.bloonstones < nextWeapon.cost.bloonstones) return false; //If not enough bloonstones
      //Take the player's money
      game.shards -= nextWeapon.cost.shards;
      game.bloonstones -= nextWeapon.cost.bloonstones;  
    }
    //Give them the weapon
    this.tier++;
    this.weapon = weapon(nextWeapon); //Construct as weapon
    this.weapon.slot = this; //Set the slot
    return true; //It worked!
  }
  clear() {
    this.weapon = null; //Remove weapon
    this.tier = 0; //Reset tier
  }
  tick() {
    if (this.weapon) {
      this.weapon.tick();
    }
  }
  draw() {
    if (this.weapon) {
      this.weapon.draw();
    }
  }
}

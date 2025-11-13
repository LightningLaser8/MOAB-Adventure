const aps = {
  ap1: {
    opt1: new WeaponSlot(
      "tiny-shooter",
      "double-shooter",
      "bomb-shooter",
      "napalm-bombs",
      "nuke-launcher",
      "meltdown",
      "solar-flare"
    ),
    opt2: new WeaponSlot(
      "tiny-shooter",
      "double-shooter",
      "bomb-shooter",
      "missile-launcher",
      "missile-battery",
      "swarmer",
      "hive"
    ),
  },
  ap2: {
    opt1: new WeaponSlot(
      "tiny-shooter",
      "double-shooter",
      "heavy-shots",
      "kinetic-impactor",
      "controlled-collision-device",
      "telekinetic-transporter",
      "kinetic-inversion"
    ),
    opt2: new WeaponSlot(
      "tiny-shooter",
      "double-shooter",
      "heavy-shots",
      "cryo-cannon",
      "shattering-shells",
      "ray-of-frost",
      "subzero"
    ),
  },
  ap3: {
    opt1: new WeaponSlot(
      "tiny-shooter",
      "double-shooter",
      "laser-blaster",
      "accelerator",
      "greenbeam",
      "purple-destroyer",
      "ultraviolet-obliterator"
    ),
    opt2: new WeaponSlot(
      "tiny-shooter",
      "double-shooter",
      "laser-blaster",
      "lancer",
      "spike",
      "impale",
      "crucify"
    ),
  },
  ap4: {
    opt1: new WeaponSlot(
      "tiny-shooter",
      "double-shooter",
      "laser-blaster",
      "accelerator",
      "greenbeam",
      "purple-destroyer",
      "ultraviolet-obliterator"
    ),
    opt2: new WeaponSlot(
      "tiny-shooter",
      "double-shooter",
      "laser-blaster",
      "lancer",
      "spike",
      "impale",
      "crucify"
    ),
  },
  ap5: {
    opt1: new WeaponSlot(
      "tiny-shooter",
      "double-shooter",
      "rifle",
      "sniper",
      "sharp-shooter",
      "hunter",
      "foreshadow"
    ),
    opt2: new WeaponSlot(
      "tiny-shooter",
      "double-shooter",
      "rifle",
      "shotgun",
      "du-rounds",
      "super-shotgun",
      "diffuse"
    ),
  },
  booster: new WeaponSlot("pop-booster", "double-booster", "scalar", "vector", "matrix"),
  sp1: new WeaponSlot("deflector", "shield-projector", "protector", "super-shield", "spike-shield"),
  error: new WeaponSlot(),
};

const selector = {
  option(type, ap, valid, conditionrepl) {
    if (!valid.includes(ap)) return aps.error; //If invalid ap, return blank slot.
    let conditionSlot = ap;
    if (ap in conditionrepl) conditionSlot = conditionrepl[ap]; //Internally ap3 and 4 are stored together
    return { condition: type + conditionSlot, selection: aps[type + ap] };
  },
  get(obj) {
    //If valid:
    if (UIComponent.evaluateCondition(obj.condition + "-slot:1"))
      //If selected slot has first option
      return obj.selection.opt1;
    if (UIComponent.evaluateCondition(obj.condition + "-slot:2"))
      //If selected slot has second option
      return obj.selection.opt2;
    //If nothing returned (should be impossible, but just in case)
    return aps.error;
  },
  set(obj, val) {
    if (UIComponent.setCondition(obj.condition + "-slot:" + val));
  },
  getAP(ap) {
    return selector.get(selector.option("ap", ap, [1, 2, 3, 4, 5, "3/5"], { 3: "3/4", 4: "3/4" }));
  },
  setAP(ap, val) {
    return selector.set(
      selector.option("ap", ap, [1, 2, 3, 4, 5, "3/5"], { 3: "3/4", 4: "3/4" }),
      val
    );
  },
  booster() {
    return aps.booster;
  },
  sp1() {
    return aps.sp1;
  },
};

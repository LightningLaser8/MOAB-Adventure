const aps = {
  ap1: {
    opt1: new WeaponSlot(
      "tiny-shooter",
      "double-shooter",
      "bomb-shooter",
      "incendiary",
      "nuke-launcher"
    ),
    opt2: new WeaponSlot(
      "tiny-shooter",
      "double-shooter",
      "bomb-shooter",
      "missile-launcher",
      "missile-battery"
    ),
  },
  ap2: {
    opt1: new WeaponSlot(
      "tiny-shooter",
      "double-shooter",
      "heavy-shots",
      "kinetic-impactor",
      "controlled-collision-device"
    ),
    opt2: new WeaponSlot(
      "tiny-shooter",
      "double-shooter",
      "heavy-shots",
      "cryo-cannon",
      "shattering-shells"
    ),
  },
  ap3: {
    opt1: new WeaponSlot(
      "tiny-shooter",
      "double-shooter",
      "laser-blaster",
      "accelerator",
      "greenbeam"
    ),
    opt2: new WeaponSlot(
      "tiny-shooter",
      "double-shooter",
      "laser-blaster",
      "lancer",
      "spike"
    ),
  },
  ap4: {
    opt1: new WeaponSlot(
      "tiny-shooter",
      "double-shooter",
      "laser-blaster",
      "accelerator",
      "greenbeam"
    ),
    opt2: new WeaponSlot(
      "tiny-shooter",
      "double-shooter",
      "laser-blaster",
      "lancer",
      "spike"
    ),
  },
  ap5: {
    opt1: new WeaponSlot(
      "tiny-shooter",
      "double-shooter",
      "rifle",
      "sniper" /*, "sharp-shooter", ... */
    ),
    opt2: new WeaponSlot(
      "tiny-shooter",
      "double-shooter",
      "rifle",
      "shotgun" /*, "chainhook-shotgun", ... */
    ),
  },
  error: new WeaponSlot(),
};
function getSelectedAP(ap) {
  if (![1, 2, 3, 4, 5].includes(ap)) return aps.error; //If invalid ap, return blank slot.
  let conditionSlot = ap;
  if (ap === 4 || ap === 3) conditionSlot = "3/4"; //Internally ap3 and 4 are stored together
  //If valid:
  if (UIComponent.evaluateCondition("ap" + conditionSlot + "-slot:1"))
    //If selected slot has first option
    return aps["ap" + ap].opt1;
  if (UIComponent.evaluateCondition("ap" + conditionSlot + "-slot:2"))
    //If selected slot has second option
    return aps["ap" + ap].opt2;
  //If nothing returned (should be impossible, but just in case)
  return aps.error;
}

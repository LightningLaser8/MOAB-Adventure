/** Generic type constructor. Uses `Registry.genericType` as the source for any template.
 * @param {{type: string | undefined}} object Source to construct from. This object is left unchanged. Type must be present in `Registry.genericType`, or else `Object` is used instead.
*/
function construct(object){
  return constructFromRegistry(object, Registry.genericType)
}
/** Bullet constructor. Only makes bullets, or generic objects if input type is invalid.
 * @param {{type: string | undefined}} object Source to construct from. This object is left unchanged. Type must be present in `Registry.bulletType`, or else `Object` is used instead.
*/
function bullet(object){
  return constructFromRegistry(object, Registry.bulletType)
}
/** Weapon constructor. Only makes weapons, or generic objects if input type is invalid.
 * @param {{type: string | undefined}} object Source to construct from. This object is left unchanged. Type must be present in `Registry.weaponType`, or else `Object` is used instead.
*/
function weapon(object){
  return constructFromRegistry(object, Registry.weaponType)
}

function constructFromRegistry(object, registry){
  if(!registry instanceof Registry) throw new ReferenceError("'"+registry+"' is not a valid registry!"); //Catch bad (nonexistent or non-registry) registry
  if(!object) return; //Catch accidental calls using null, undefined or similar

  //Constructs an instance using type from registry, if it exists. If not, the error will throw.
  let instantiated = new (registry.get(object.type))();
  let cloned = {}
  //Clone the object if possible, to copy stuff like bullet drawers, or weapon.shoot.pattern. If it fails, just use the original.
  try{
    cloned = structuredClone(object)
  }
  catch(error){
    cloned = object
    console.warn("Could not clone object:", error)
  }
  instantiated = Object.assign(instantiated, cloned);
  (instantiated.init)?instantiated.init():{} //Initialise if possible.
  return instantiated;
}
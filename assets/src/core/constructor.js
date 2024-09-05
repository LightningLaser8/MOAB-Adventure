function construct(object){
  let instantiated = new object.type();
  instantiated = Object.assign(instantiated, object);
  (instantiated.init)?instantiated.init():{} //Initialise if possible.
  return instantiated;
}
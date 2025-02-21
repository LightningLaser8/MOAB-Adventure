class Registry {
  ///Internal Map for holding the registry items.
  #content = new Map();
  get size() {
    //Get size of the internal Map.
    return this.#content.size;
  }
  //Basic registries for holding objects used by the base game.
  static weaponType = new this();
  static bulletType = new this();
  static genericType = new this();
  static weapons = new this();
  static images = new this();
  static statuses = new this();
  static blimps = new this();
  static entities = new this();
  static sounds = new this();
  static worlds = new this();
  /** Adds an item to registry.
   * @param {string} name Registry name of item. This is not case sensitive.
   * @param {*} item Item to add to registry.
   */
  add(name, item) {
    if (!name) return; //catch empty name
    if (!item) return; //catch null items
    if (typeof name !== "string") name = name.toString(); //Stringify name
    name = name.toLowerCase(); //Remove case sensitivity.
    //Throw an error if the item already exists.
    if (this.has(name))
      throw new SyntaxError(
        "Item " +
          name +
          " already exists in registry! Consider using a different name."
      );
    //Add to internal Map
    this.#content.set(name, item);
  }
  /**
   * Checks for an item in registry.
   * @param {string} name Registry name to check for. Not case sensitive.
   * @returns Whether or not the name exists.
   */
  has(name) {
    if (typeof name !== "string") name = name.toString(); //Stringify name
    name = name.toLowerCase(); //Remove case sensitivity.
    //Return presence
    return this.#content.has(name);
  }
  /**
   * Gets an item from registry name.
   * @param {string} name Registry name to get. Not case sensitive.
   * @returns The item, if present.
   */
  get(name) {
    if (typeof name !== "string") name = name.toString(); //Stringify name
    name = name.toLowerCase(); //Remove case sensitivity.
    //Throw an error if the item doesn't exist.
    if (!this.has(name))
      throw new ReferenceError(
        "Item " +
          name +
          " does not exist in registry! Consider checking your spelling."
      );
    //Return item, if it exists.
    return this.#content.get(name);
  }
  /**
   * Renames a registry item. Neither parameter is case-sensitive.
   * @param {string} name Registry name to change.
   * @param {string} newName What to change the name to.
   */
  rename(name, newName) {
    if (typeof name !== "string") name = name.toString(); //Stringify name
    name = name.toLowerCase(); //Remove case sensitivity.
    //Throw an error if the item doesn't exist.
    if (!this.has(name))
      throw new ReferenceError(
        "Item " +
          name +
          " does not exist in registry! Consider checking your spelling."
      );
    //Get entry
    let current = this.get(name);
    //Remove current entry
    this.#content.delete(name);
    //Add new entry
    this.add(newName, current);
  }
  /**
   * Adds another registry item with the same content as the specified one.
   * @param {string} name Registry name to change.
   * @param {string} as What to change the name to.
   */
  alias(name, as) {
    if (typeof name !== "string") name = name.toString(); //Stringify name
    name = name.toLowerCase(); //Remove case sensitivity.
    //Throw an error if the item doesn't exist.
    if (!this.has(name))
      throw new ReferenceError(
        "Item " +
          name +
          " does not exist in registry! Consider checking your spelling."
      );
    //Get current entry
    let current = this.get(name);
    //Add new entry with the same content
    this.add(as, current);
  }
  /**
   * Executes a function for each element in the registry.
   * @param {(item, name: string) => void} func Callback for each element.
   */
  forEach(func) {
    //Use built-in Map iterator
    this.#content.forEach((element, name) => {
      //Discard return value
      void func(element, name);
    });
  }
  /**
   * Performs a function on each item in registry asynchronously.
   * @param {(name: string, item) => void} callback Function to perform on each item.
   */
  async forEachAsync(callback){
    this.#content.forEach(async (value, key) => await void callback(key, value))
  }
}

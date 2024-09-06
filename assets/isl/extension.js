import { ISLInterpreter, ISLError } from "https://cdn.jsdelivr.net/gh/LightningLaser8/ISL@main/core/interpreter.js";
import { ISLExtension } from "https://cdn.jsdelivr.net/gh/LightningLaser8/ISL@main/core/extensions.js";
class MAExtension extends ISLExtension {
  #types = {
    box: {},
    blimp: {}
  }
  #constructing = {
    name: "<null>",
    type: null,
    obj: null,
  };
  constructor(interpreter) {
    super("moab-adventure");
    this.addLabel("<", ["box-type", "blimp"]);
    this.addLabel("spawn", ["box-type"]);
    this.addLabel("use", ["blimp"]);

    this.addKeyword(">", function () {
      //Close obj
      if (this.#constructing.type in this.#types) {
        this.#types[this.#constructing.type][this.#constructing.name] = this.#constructing.obj;
      } else {
        throw new ISLError("Unexpected closing '>'", SyntaxError);
      }
      //Reset
      this.#constructing.obj = null;
      this.#constructing.name = "<null>";
      this.#constructing.type = null;
    });

    this.addKeyword("blimp", function (interp, labels, name) {
      name ??= "<null>";
      if (labels.length === 1) {
        if (labels[0] === "<") {
          if (this.#types.blimp[name])
            throw new ISLError(
              "Blimp '" + name + "' has already been defined!",
              SyntaxError
            );
          const blimp = {};
          const defaultEntity = new Entity()
          blimp.drawer = {};
          Object.assign(blimp.drawer, defaultEntity.drawer);
          this.#constructing.obj = blimp;
          this.#constructing.name = name;
          this.#constructing.type = "blimp";
        }
        if (labels[0] === "use") {
          if (this.#types.blimp[name]) {
            Object.assign(game.player, this.#types.blimp[name])
            game.player.init()
          } else {
            throw new ISLError(
              "There is no blimp '" + name + "' defined!",
              ReferenceError
            );
          }
        }
      } else {
        throw new ISLError(
          "Exactly one label must be provided for a constructor",
          ReferenceError
        );
      }
    });

    this.addKeyword("box-type", function (interp, labels, name) {
      name ??= "<null>";
      if (labels.length === 1) {
        if (labels[0] === "<") {
          if (this.#types.box[name])
            throw new ISLError(
              "Box type '" + name + "' has already been defined!",
              SyntaxError
            );
          const box = {};
          Object.assign(box, Box.default);
          box.drawer = {};
          Object.assign(box.drawer, Box.default.drawer);
          box.destroyReward = {};
          Object.assign(box.destroyReward, Box.default.destroyReward);
          this.#constructing.obj = box;
          this.#constructing.name = name;
          this.#constructing.type = "box";
        }
        if (labels[0] === "spawn") {
          if (this.#types.box[name]) {
            construct(this.#types.box[name]).addToWorld(world);
          } else {
            throw new ISLError(
              "There is no box type '" + name + "' defined!",
              ReferenceError
            );
          }
        }
      } else {
        throw new ISLError(
          "Exactly one label must be provided for a constructor",
          ReferenceError
        );
      }
    });
    this.addKeyword("|", function (interp, labels, attr, value) {
      this.#validateConstruction();
      let type = this.#constructing.type
      if (!(type in MAExtension.#attributeSetter))
        throw new ISLError(
          "Type '" + type + "' has no attributes"
        );
      if (!(attr in MAExtension.#attributeSetter[type])){
        let found = false
        for(let a of MAExtension.#alts[type]){
          if(attr in MAExtension.#attributeSetter[a]){
            type = a
            found = true
            break;
          }
        }
        if(!found) throw new ISLError(
          "Attribute '" +
            attr +
            "' does not exist on type '" +
            type +
            "'"
        );
      }
      MAExtension.#attributeSetter[type][attr](
        this.#constructing.obj,
        value
      );
    });
  }
  static #alts = {
    box: ["entity", "positioned"],
    entity: ["positioned"],
    blimp: ["entity"]
  }
  static #attributeSetter = {
    positioned: {
      x: (obj, value) => {
        ISLInterpreter.validateNum("<attribute set>", ["x", value])
        obj.x = value;
      },
      y: (obj, value) => {
        ISLInterpreter.validateNum("<attribute set>", ["y", value])
        obj.y = value;
      }, 
    },
    entity: {
      name: (obj, value) => {
        ISLInterpreter.validateStr("<attribute set>", ["name", value])
        obj.name = value;
      },
      health: (obj, value) => {
        ISLInterpreter.validateNum("<attribute set>", ["health", value])
        obj.health = value;
      },
      hp: (obj, value) => {
        ISLInterpreter.validateNum("<attribute set>", ["health (as hp)", value])
        obj.health = value;
      },
      image: (obj, value) => {
        if (obj.drawer) {
          let parts = value.split(".");
          if (parts.length === 1) {
            if (!parts[0] in images.entity)
              throw new ISLError(
                "Image '" + parts[0] + "' does not exist",
                ReferenceError
              );
            obj.drawer.image = images.entity[parts[0]];
          } else if (parts.length === 2) {
            if (!(parts[0] in images))
              throw new ISLError(
                "Image category '" + parts[0] + "' does not exist",
                ReferenceError
              );
            if (!(parts[1] in images[parts[0]]))
              throw new ISLError(
                "Image '" +
                  parts[1] +
                  "' does not exist in category '" +
                  parts[0] +
                  "'",
                ReferenceError
              );
            obj.drawer.image = images[parts[0]][parts[1]];
          } else {
            throw new ISLError(
              "Image specifiers must have at most 2 parts.",
              SyntaxError
            );
          }
          return true;
        }
        return null;
      },
      width: (obj, value) => {
        ISLInterpreter.validateNum("<attribute set>", ["width", value])
        obj.drawer ? (obj.drawer.width = value) : null;
      },
      height: (obj, value) => {
        ISLInterpreter.validateNum("<attribute set>", ["height", value])
        obj.drawer ? (obj.drawer.height = value) : null;
      },
      size: (obj, value) => {
        ISLInterpreter.validateNum("<attribute set>", ["size", value])
        if (obj.drawer) {
          obj.drawer.height = value;
          obj.drawer.width = value;
          obj.hitSize = value / 2;
          return true;
        }
        return null;
      },
    },
    box: {
      reward: (obj, value) => {
        if (obj.drawer) {
          let parts = value.split(",").map(x => parseInt(x)).filter(x => !isNaN(x));
          if (parts.length === 1) {
            obj.destroyReward.shards = parts[0]
          } else if (parts.length === 2) {
            obj.destroyReward.shards = parts[0]
            obj.destroyReward.bloonstones = parts[1]
          } else {
            throw new ISLError(
              "Destroy reward specifiers must have at most 2 parts.",
              SyntaxError
            );
          }
          return true;
        }
        return null;
      },
    },
    blimp: {

    }
  };
  #validateConstruction() {
    if (!this.#constructing.obj) {
      throw new ISLError("Nothing is under construction!", ReferenceError);
    }
  }
}
export { MAExtension };
import {ISLInterpreter} from "https://cdn.jsdelivr.net/gh/LightningLaser8/ISL@main/core/interpreter.js"
import {ExtensionLoader} from "https://cdn.jsdelivr.net/gh/LightningLaser8/ISL@main/modules/loader/extension-loader.js"
const islinterpreter = new ISLInterpreter({
  name: "Integrated ISL",
  instructions: 100,
  environment: "moab-adventure"
})
//TODO Set this one up properly later
ExtensionLoader.fileExtend(islinterpreter, "http://127.0.0.1:5500/assets/isl/extensions.json").then(()=>{
  //Show load message in isl, start demo script
  islinterpreter.loadISL([
    "log \"ISL Loaded\"",
    "flush",
    "< box-type MOAB",
    "| health 20",
    "| size 150",
    "| width 230",
    "| image entity.blimp_moab",
    "| reward 10,2",
    "| x 2000",
    ">",
    "spawn box-type MOAB",
    "< blimp Clock",
    "| health 20",
    "| image ui.clock",
    "| size 100",
    ">",
    "< box-type shard",
    "| health 1",
    "| size 20",
    "| width 15",
    "| image ui.shard",
    "| reward 1,0",
    "| x 2000",
    ">",
    "spawn box-type shard",
    "spawn box-type shard",
    "spawn box-type shard",
    "spawn box-type shard",
    "spawn box-type shard",
    "spawn box-type shard",
    "stop"
  ])
  islinterpreter.startExecution()
})
//For security reasons, expose only some stuff
window["islinterface"] = {
  start: () => islinterpreter.startExecution(),
  pause: () => islinterpreter.pauseExecution(),
  stop: () => islinterpreter.stopExecution(),
  load: (arr) => islinterpreter.loadISL(arr),
  clear: () => islinterpreter.loadISL([]),
  execute: (isl) => islinterpreter.executeLine(isl)
}
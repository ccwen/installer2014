//var othercomponent=Require("other"); 
//new module filename must be added to scripts section of ./component.js and export here
var Reflux = Require("reflux");
var actions = Reflux.createActions(["getDownload","openApp","checkHasUpdate"]);

module.exports=actions;
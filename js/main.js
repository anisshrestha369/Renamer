const csInterface = new CSInterface();
const extensionRoot = csInterface.getSystemPath(SystemPath.EXTENSION) + "/js/";

var prefix = document.getElementById("prefix");
var layerName = document.getElementById("layerName");
var suffix = document.getElementById("suffix");
var autoIncrement = document.getElementById("autoIncrement");

var rename = document.getElementById("rename");
var append = document.getElementById("append");
var reload = document.getElementById("reload");

rename.onclick = function () {
  var prefixValue = prefix.value;
  var layerNameValue = layerName.value;
  var suffixValue = suffix.value;
  var autoIncrementState = autoIncrement.checked;

  var script = `$.evalFile("${extensionRoot}renamer.jsx"); rename("${prefixValue}", "${layerNameValue}", "${suffixValue}", ${autoIncrementState});`;
  csInterface.evalScript(script);
};

reload.onclick = function () {
  location.reload();
  // alert("Reloaded!");
};

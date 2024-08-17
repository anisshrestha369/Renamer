function rename(prefix, name, suffix, autoIncrement) {
  prefix = prefix.replace(/\s+$/, "");
  name = name.replace(/\s+$/, "");
  suffix = suffix.replace(/\s+$/, "");

  var docs = app.documents;

  if (docs.length === 0) {
    alert("No documents are open.");
    return;
  }

  var doc = app.activeDocument;

  var layers = getLayersOfSelectedObjects();

  if (layers.length === 0) {
    var noSelectionConfirm = confirm("No objects selected. Rename all layers?");

    if (!noSelectionConfirm) return;

    layers = doc.layers;
  }

  renameLayers(layers, prefix, name, suffix, autoIncrement);

  function getLayersOfSelectedObjects() {
    var selectedObjects = doc.selection;
    var layers = [];

    for (var i = 0; i < selectedObjects.length; i++) {
      var obj = selectedObjects[i];
      var layer = obj.layer;

      var exists = false;

      for (var j = 0; j < layers.length; j++) {
        if (layers[j] === layer) {
          exists = true;
          break;
        }
      }

      if (!exists) {
        layers.push(layer);
      }
    }

    return layers;
  }

  function renameLayers(layers, prefix, name, suffix, increment) {
    var layerName = "";

    if (!prefix && !name && !suffix) {
      var emptyNameConfirm = confirm("No names provided. Rename to default?");

      if (!emptyNameConfirm) return;
    }

    if (prefix) layerName += prefix + " ";
    if (name) layerName += name + " ";
    if (suffix) layerName += suffix + " ";

    var counter = 1;

    for (var i = 0; i < layers.length; i++) {
      if ((prefix || suffix) && !name) {
        layerName = prefix + " " + layers[i].name + " " + suffix + " ";
      }

      if (increment) {
        layers[i].name = layerName + counter;
        counter++;
      } else {
        layers[i].name = layerName;
      }
    }
  }
}

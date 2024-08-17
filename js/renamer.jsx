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
        layerName = prefix + " " + layers[i].name + " " + suffix;
      }

      if (increment) {
        layers[i].name = layerName + counter;
        counter++;
      } else {
        layers[i].name = layerName;
      }
    }
  }

  // if (layersOfSelectedObjects.length === 0) {
  //   var emptyConfirm = confirm(
  //     "No objects selected. Do you want to rename all layers?"
  //   );

  // if(emptyConfirm){

  // }
  // }

  // if (!prefix && !layerName && !suffix) {
  //   var confirmDefaultRename = confirm(
  //     "All fields are empty. Do you want to remove layer names?"
  //   );

  //   if (!confirmDefaultRename) {
  //     return;
  //   } else {
  //     autoIncrement = false;
  //   }
  // }

  // var newLayerName = "";

  // if (prefix) {
  //   newLayerName += prefix + " ";
  // }
  // if (layerName) {
  //   newLayerName += layerName + " ";
  // }
  // if (suffix) {
  //   newLayerName += suffix;
  // }

  // newLayerName = newLayerName.replace(/\s+$/, "");

  // var renamedLayers = {};
  // var counter = 1;

  // for (var i = 0; i < selectedObjects.length; i++) {
  //   var object = selectedObjects[i];
  //   var layer = object.layer;

  //   if (!renamedLayers[layer.name]) {
  //     if (autoIncrement) {
  //       layer.name = newLayerName + " " + counter;
  //       counter === 1 ? newLayerName : newLayerName + " " + counter;
  //       counter++;
  //     } else {
  //       layer.name = newLayerName;
  //     }

  //     renamedLayers[layer.name] = true;
  //   }
  // }

  // alert(newLayerName);
}

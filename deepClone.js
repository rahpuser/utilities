function isObjInArray(obj, array, func){
  for(var i=0; i<array.length; i++){
    var objPlace = func(array[i]) || array[i];
    if(objPlace === obj)
      return ~i;
  }
  return false;
}

function customClon(original, circleRefs){
  circleRefs = circleRefs || [];
  var copy;

  // undefined, null and all simple type: string, number..
  if (undefined === original || null === original || 'object' !== typeof original) return original;

  // Handle Date
  if (original instanceof Date) {
    copy = new Date();
    copy.setTime(original.getTime());
    return copy;
  }

  // Handle Object
  if (original instanceof Object) {
    // is a circular ref?
    var isIn = isObjInArray(original, circleRefs, function(el){ return el.original;});
    if(isIn){
      return circleRefs[~isIn].copy;
    }
      
    // array or normal object
    copy = original instanceof Array ? [] : Object.create(original.constructor.prototype);
    circleRefs.push({original: original, copy: copy});
    for (var attr in original) {
      if (original.hasOwnProperty(attr)) copy[attr] = customClon(original[attr], circleRefs);
    }
    return copy;
  }
}
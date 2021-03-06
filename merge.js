function merge(a, b, getk, behavior) {
  var behaviorFlag = behavior || 1;
  var getKey = getk || function (el) { return el; };
  var merged = [];
  var news = [];
  var duplicated = [];
  var seen = {};
  var iterateOver = a.concat(b);

  iterateOver.forEach(function (el, i) {
    if (seen.hasOwnProperty(getKey(el))) {
      duplicated.push(el);
      if (behaviorFlag === 1) {
        return;
      }
      if (behaviorFlag === -1) {
        merged[seen[getKey(el)]] = el;
        seen[getKey(el)] = seen[getKey(el)];
        return;
      }
    }
    if (i >= a.length)
      news.push(el);
    merged[merged.length] = el;
    seen[getKey(el)] = merged.length - 1;
  });

  return {
    merge: merged,
    news: news,
    duplicated: duplicated
  };
}

'use strict';

var fs = require('fs');
var version = JSON.parse(fs.readFileSync('package.json', 'utf8')).version;

module.exports = function (_ref) {
  var t = _ref.types;

  return {
    visitor: {
      ReferencedIdentifier: function(path, state) {
        var define = state.opts.define || '__VERSION__'; // 默认值
        if (path.node.name === define) {
          path.replaceWith(t.valueToNode(version));
        }
      }
    }
  };
};

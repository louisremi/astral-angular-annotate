// mark $injector.invoke objects

var annotateInjectable = require('../lib/annotate-injectable');
var deepApply = require('../lib/deep-apply');

var injectorAnnotatorPass = module.exports = {};
injectorAnnotatorPass.name = 'angular:annotator:injector';
injectorAnnotatorPass.prereqs = [];

injectorAnnotatorPass.run = function (ast, info) {
  deepApply(ast, [{
    "type": "CallExpression",
    "callee": {
      "type": "MemberExpression",
      "object": {
        "type": "Identifier",
        "name": "$injector"
      },
      "property": {
        "type": "Identifier",
        "name": "invoke"
      }
    }
  }], function (injectorChunk) {
    if ( injectorChunk.arguments[0].type === "FunctionExpression" ) {
      injectorChunk.arguments[0] = annotateInjectable(injectorChunk.arguments[0]);
    }
  });
};

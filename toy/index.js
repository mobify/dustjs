// Deps
var fs = require('fs');
var path = require('path');
var stringify = require('json-stringify-pretty-compact');
var parse = require('../lib/parser').parse;
var compile = require('../lib/compiler').compile;
var dust = require('../lib/dust');

var dir = path.join(__dirname, 'templates');
var paths = {};
var sources = {};
var asts = {};
var compiled = {};
var context = {
  outer: 'outer',
  passed: 'passed',
  example: 'example',
  state: {
    weak: true
  }
};

paths = {
  'include': path.join(dir, 'include.dust'),
  'components/example': path.join(dir, 'components', 'example.dust')
}
// console.log(paths);

for (var t in paths) {
  var path = paths[t];

  sources[t] = fs.readFileSync(path, 'utf8');
  // console.log(sources[t]);

  // asts[t] = stringify(parse(sources[t]));
  // console.log(asts[t]);

  compiled[t] = compile(sources[t], t);
  console.log(compiled[t]);

  dust.loadSource(compiled[t]);
}

dust.render('include', context, function(error, output) {
  if (error) {
    console.log(error);
  }

  console.log(output);
});

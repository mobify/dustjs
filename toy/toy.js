var fs = require('fs');
var path = require('path');
var parse = require('../lib/parser').parse;
var source;

source = fs.readFileSync(path.join(__dirname, 'example.dust'), 'utf8');

console.log(source);
console.log(parse(source));

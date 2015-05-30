var browserify = require('browserify');

var foo = require('./foo.js');
var x = foo(100);
console.log(x);

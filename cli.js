#!/usr/bin/env node

var HtmlDist = require('./index');
var args = require('yargs').argv;
var _ = require('lodash');
var fs = require('fs');

var file = args._[0];

if(!file) throw "No file given";

var dist = new HtmlDist(fs.readFileSync(file));

if(args.r || args['remove-all']) {
  dist.removeAll();
}

var insertArgs = Array.isArray(args.i) ? args.i : [args.i];
insertArgs = insertArgs.concat(Array.isArray(args.insert) ? args.insert : [args.insert]);
insertArgs.filter(function(x) { return !!x; }).forEach(function(path) {
  dist.insertScript(path);
});

var outputFile = args.o || args.output;

var shouldMinify = !!(args.m || args.minify);
var htmlOut = dist.out(shouldMinify);

if(outputFile) {
  fs.writeFileSync(outputFile, htmlOut);
} else {
  console.log(htmlOut);
}

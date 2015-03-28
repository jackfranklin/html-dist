#!/usr/bin/env node

var args = require('yargs').argv;
var cheerio = require('cheerio');
var _ = require('lodash');
var fs = require('fs');
var minify = require('html-minifier').minify;

var file = args._[0];

if(!file) throw "No file given";

var $ = cheerio.load(fs.readFileSync(file));

if(args.r || args['remove-all']) {
  $('script').remove();
}

var insertScriptFiles = _.uniq(((args.i || []).concat(args.insert || [])));

insertScriptFiles.forEach(function(path) {
  $('body').append("<script src='" + path + "'></script>");
});

var output = args.o || args.output;

var shouldMinify = !!(args.m || args.minify);

var html;
if(shouldMinify) {
  html = minify($.html(), {
  collapseWhitespace: true,
  removeComments: true
  });
} else {
  html = $.html();
}

if(output) {
  fs.writeFilesync(output, html);
} else {
  console.log(html);
}

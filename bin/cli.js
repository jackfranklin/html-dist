#!/usr/bin/env node

require('babel-register');

var htmlDist = require('../src/index');
var fs = require('fs');
var path = require('path');
var argv = require('yargs').demand(['config', 'input']).argv;

var configPath = path.join(process.cwd(), argv.config);

var config = require(configPath).default;

fs.readFile(argv.input, {
  encoding: 'utf8'
}, function(err, input) {
  htmlDist.run({
    config,
    input
  });
});



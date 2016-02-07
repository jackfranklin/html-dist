#!/usr/bin/env node

require('babel-register');

var htmlDist = require('../src/index');
var fs = require('fs');
var path = require('path');
var argv = require('yargs').demand(['config', 'input']).argv;

var configPath = path.join(process.cwd(), argv.config);

var config = require(configPath).default;
console.log('got config', config);

htmlDist.run({
  config,
  input: argv.input
});


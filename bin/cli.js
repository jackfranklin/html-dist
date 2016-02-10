#!/usr/bin/env node

require('babel-register');

var _ = require('lodash');
var htmlDist = require('../src/index');
var fs = require('fs');
var path = require('path');
var argv = require('yargs').demand(['config', 'input']).argv;

var userArgs = _.omit(argv, ['config', 'input', '$0', '_']);

fs.readFile(argv.input, {
  encoding: 'utf8'
}, function(err, input) {
  // must be done before requiring the config file
  htmlDist.setUserArgs(userArgs);

  var configPath = path.join(process.cwd(), argv.config);
  var config = require(configPath).default;


  htmlDist.run({
    config,
    input
  });
});



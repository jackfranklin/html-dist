#!/usr/bin/env node

var argv = require('yargs').demand(['config', 'input']).argv;

var _ = require('lodash');
var htmlDist = require('../lib/index');
var fs = require('fs');
var path = require('path');

var userArgs = _.omit(argv, ['config', 'input', '$0', '_']);

fs.readFile(argv.input, {
  encoding: 'utf8'
}, function(err, input) {

  // must be done before requiring the config file
  htmlDist.setUserArgs(userArgs);

  var configPath = path.join(process.cwd(), argv.config);
  var config = require(configPath);

  htmlDist.run({
    config,
    input
  });
});



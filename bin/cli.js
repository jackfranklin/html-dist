#!/usr/bin/env node

var argv = require('yargs').demand(['config', 'input']).argv;

if (argv.$0 === 'bin/cli.js') {
  // development mode
  require('babel-register');
} else {
  // shipped in node_modules so need to configure Babel some more
  var transpileRegex = new RegExp("(node_modules/\html-dist)|(" + argv.config + ")");

  require('babel-register')({
    presets: ['es2015'],
    only: transpileRegex
  });
}

var _ = require('lodash');
var htmlDist = require('../src/index');
var fs = require('fs');
var path = require('path');

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



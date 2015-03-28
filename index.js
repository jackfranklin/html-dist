var cheerio = require('cheerio');
var minify = require('html-minifier').minify;

var HtmlDist = function(input) {
  this.input = input;
  this.$ = cheerio.load(input);
};

var p = HtmlDist.prototype;

p.out = function(shouldMinify) {
  if(shouldMinify) {
    return minify(this.$.html(), {
      collapseWhitespace: true,
      removeComments: true
    });
  } else {
    return this.$.html();
  }
}
p.removeAll = function() {
  this.$('script').remove();
  return this;
}

p.insertScript = function(src) {
  this.$('body').append("<script src='" + src + "'></script>");
}

module.exports = HtmlDist;

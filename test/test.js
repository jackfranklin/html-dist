var HtmlDist = require('../index');
var expect = require('expect.js');

describe('removeAll', function() {
  it('removes all script tags', function() {
    var dist = new HtmlDist('<script></script><p></p>');
    dist.removeAll();
    expect(dist.out()).to.eql('<p></p>');
  });
});

describe('out', function() {
  it('returns the html', function() {
    var dist = new HtmlDist('<script></script><p></p>');
    expect(dist.out()).to.eql('<script></script><p></p>');
  });

  it('can minify the HTML', function() {
    var html = "<p>foo \
    </p>";
    var dist = new HtmlDist(html);
    expect(dist.out(true)).to.eql('<p>foo</p>');
  });
});

describe('insertScript', function() {
  var dist;
  beforeEach(function() {
    dist = new HtmlDist('<body><p>foo</p></body>');
  });

  it('appends the script tag', function() {
    dist.insertScript('foo.js');
    expect(dist.out(true)).to.contain('</p><script src="foo.js"')
  });
});

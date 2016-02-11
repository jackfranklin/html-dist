import expect from 'expect.js';
import script from '../src/script';
import { toHtml } from '../src/html';

describe('script()', () => {
  it('can take a src attribute', () => {
    const result = script({ src: 'test.js' });
    expect(toHtml(result)).to.eql('<script src="test.js"></script>');
  });

  it('can set script contents', () => {
    const result = script({ contents: 'abc' });
    expect(toHtml(result)).to.eql('<script>abc</script>');
  });

  it('can take any random properties', () => {
    const result = script({ type: 'text/javascript', 'data-foo': 2 });
    expect(result.properties).to.eql({
      type: 'text/javascript',
      'data-foo': '2'
    });
  });
});

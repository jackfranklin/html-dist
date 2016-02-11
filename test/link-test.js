import expect from 'expect.js';
import link from '../src/link';
import { toHtml } from '../src/html';

describe('link()', () => {
  it('creates a <link> node', () => {
    const result = link({ href: 'style.css', rel: 'stylesheet', type: 'text/css' });
    expect(toHtml(result)).to.eql('<link href="style.css" rel="stylesheet" type="text/css">');
  });
});

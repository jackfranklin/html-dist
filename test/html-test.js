import expect from 'expect.js';
import { getDoctype } from '../src/html';

const input = `<!DOCTYPE html><html><body></body></html>`;

describe('getDoctype()', () => {
  it('pulls out the doctype', () => {
    expect(getDoctype(input)).to.equal('<!DOCTYPE html>');
  });
});

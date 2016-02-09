import expect from 'expect.js';
import googleAnalytics from '../src/google-analytics';
import { toHtml } from '../src/html';

describe('googleAnalytics()', () => {
  it('generates JS with your user agent', () => {
    const result = toHtml(googleAnalytics('ABC123'));
    expect(result).to.contain('ABC123');
    expect(result).to.contain('GoogleAnalyticsObject');
  });
});

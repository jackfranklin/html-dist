import { Node, textNode, toHtml } from './html';

function makeGoogleAnalytics(ua) {
  return `(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','//www.google-analytics.com/analytics.js','ga'); ga('create', '${ua}', 'auto'); ga('send', 'pageview');`;
}

export default function(ua) {
  const text = textNode(makeGoogleAnalytics(ua));
  const node = new Node('script', {}, [text]);
  return toHtml(node);
};

import fs from 'fs';

import { fromHtml, toHtml } from './html';
import { processTree } from './process-tree';
import path from 'path';
import mkdirp from 'mkdirp';

import { minify } from 'html-minifier';
import html from 'html';

export default function({ config, input }) {
  let tree = fromHtml(input);

  // TODO: move this into a module with tree fns
  tree = tree.filter((item) => {
    return item.text != '' && item.text != '\n';
  });

  // TODO: this assumes tree[0] is the HTML tag - worth a check?
  const htmlChildren = tree[0].children;

  const body = htmlChildren.find((node) => node.tagName === 'body');
  const head = htmlChildren.find((node) => node.tagName === 'head');

  // TODO: process the head!
  const newHead = processTree(config, head);
  const newBody = processTree(config, body);

  const newHtmlChildren = htmlChildren.map((child) => {
    if (child.tagName === 'body') {
      return newBody;
    } else if (child.tagName === 'head') {
      return newHead;
    } else {
      return child;
    }
  });

  tree[0].children = newHtmlChildren;

  let newHtml = toHtml(tree[0]);

  if (config.minify === true) {
    newHtml = minify(newHtml, {
      collapseWhitespace: true,
    });
  } else {
    // TODO: indent size being customisable would be cool
    newHtml = html.prettyPrint(newHtml, { indent_size: 2 });
  }

  if (config.outputFile) {
    writeToFile(newHtml, config.outputFile);
  } else {
    console.log(newHtml);
  }
}

function writeToFile(html, outfile) {
  const dirsToMake = path.dirname(outfile);
  mkdirp(dirsToMake, function(e) {
    // TODO: deal with error here
    console.log('Wrote to', outfile);
    fs.writeFile(outfile, html);
  });

}

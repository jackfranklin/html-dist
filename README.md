__Note: `html-dist` is being completely rewritten. If you want the old version, install `html-dist@0.1.0` and read [this README](https://github.com/jackfranklin/html-dist/blob/22eba9e55364932d1863fead9526df706a5822cf/README.md)__.

# html-dist

Easily manipulate HTML files by removing and inserting elements.

__VERY WIP!__

```
npm install --save-dev html-dist@0.2.0
```

## Why?

The problem that lead to me creating html-dist was deploying front-end only projects. In development mode I tend to have an HTML file set up for development. For example, an HTML file for a [jspm](http://jspm.io) project might look like so:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>My Project</title>
    <link rel="stylesheet" type="text/css" href="style.css">

    <script src="jspm_packages/system.js"></script>
    <script src="config.js"></script>
    <script>
      System.import('app/main');
    </script>
  </head>
  <body>
  </body>
</html>
```

JSPM provides a tool to bundle all my JavaScript into one file, but I'm left to deal with my HTML file. I could manually edit it each time, but that gets boring quickly. This is why I built `html-dist`. I can create a configuration file that tells `html-dist` how to manipulate the HTML and it will produce the new HTML file. In this instance I want to remove all `script` tags and insert one new one to `bundle.js`. Additionally I'd like to add the Google Analytics script.

Here's how I would do that with `html-dist`:

1. Install `html-dist`: `npm install --save-dev html-dist`
2. Create a `html-dist.config.js` file (with full ES2015 support):

```javascript
import {
  script,
  googleAnalytics,
} from 'html-dist';

export default {
  // where to write to
  outputFile: 'dist/index.html',
  // minify the HTML
  minify: true,
  head: {
    // in the <head>, remove any elements matching the 'script' CSS selector
    remove: 'script'
  },
  body: {
    // append the following things to the body
    appends: [
      script({
        src: 'bundle.js'
      }),
      googleAnalytics('UA-1234')
    ]
  }
}
```

3. Run `html-dist`:

```
html-dist --config html-dist.config-js --input index.html
```

Which will produce the following:

```html
<html><head><title>My Project</title><link rel="stylesheet" type="text/css" href="style.css"></head><body><script src="bundle.js"></script><script>(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','//www.google-analytics.com/analytics.js','ga'); ga('create', 'UA-1234', 'auto'); ga('send', 'pageview');</script></body></html>
```

4. Deploy `dist/index.html` to production.

## Fundamentals of html-dist

Under the hood html-dist uses the [virtual-dom](https://github.com/Matt-Esch/virtual-dom) library to manipulate all the HTML. It parses your HTML into a Virtual DOM tree which it then allows you to manipulate, before generating HTML from that virtual dom tree at the end of the process.

This means if you want you can harness the full power of the virtual DOM to manipulate your HTML. However, for most use cases html-dist will provide helpers to make it easy for you. It's possible to use html-dist without ever dealing with the virtual DOM.

## The configuration object

The configuration file is fully ES2015 enabled (via Babel). The configuration object must be the default export:

```javascript
export default {
  // configuration here
}
```

Using a `.js` file rather than JSON also enables you to leave comments as you wish.

The top level keys you can specify are:

- `outputFile`: the path to write the generated HTML to. If not given the output will be printed to STDOUT.
- `minfiy`: if set to `true`, the generated HTML will be minified. Else it will be formatted nicely.
- `head`: an object of manipulations to make to the `<head>` element.
- `body`: an object of manipulations to make to the `<body>` element.

## Manipulation objects

The object given as `head` or `body` also must specify certain keys.

### Appends and Prepends

The recommended way to use html-dist that should satisfy most use cases is through the keys `appends`, `prepends` and `remove`:

- `remove: 'cssSelector'` removes any elements that match the given selector.
- `prepends: [...]` prepend the given elements.
- `appends: [...]` append the given elements.

For example, given:

```js
head: {
  remove: 'script'
  prepends: [
    script({ src: 'bundle.js' })
  ],
  appends: [
    script({ src: 'other-bundle.js' })
  ]
}
```

The `<head>` element will first have all `script` tags removed (`remove` is always called first), it will then have `<script src='bundle.js'></script>` prepended and `<script src='other-bundle.js'></script>` appended.

### Full control with `tree`

If you'd like full control over the manipulations, you should define the `tree` function:

```
head: {
  tree: function(head) {
    // manipulate head here
  }
}
```

When the `tree` function is given it is the _only_ function called. It will be passed an object that you can use to manipulate the element. See "Manipulating Trees" below for the full documentation.

## Manipulating Trees

When you define a `tree` function in a manipulation object that function will be given an instance of `TreeManipulator`, which allows you to manipulate the tree as you like:

```js
head: {
  tree: function(head) {
    // head is an instance of `TreeManipulator`
  }
}
```

The following methods are available:

- `remove(cssSelector)` removes all elements that match the given CSS selector. For example: `head.remove('script')`.
- `append(node)` appends the new node as a child element. For example: `head.append(script({ src: 'test.js' }))`.
- `prepend(node)` same as append, but prepends rather than appends.
- `replaceWith(childrenArray)` replace the entire contents of the node with the new ones. For example:

```js
head: {
  tree: function(head) {
    return head.replaceWith([
      script({ src: 'test.js' }),
      googleAnalytics('UA-1234-1')
    ]);
  }
}
```

That would replace the contents of your `<head>` with a script tag and the Google Analytics snippet.

Additionally, `remove`, `append` and `prepend` are chainable:

```js
head.remove('script').append(...).prepend(...);
```










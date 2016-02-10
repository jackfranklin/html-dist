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




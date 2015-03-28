# html-dist

Takes a HTML file and edits its `script` tags.

```
npm install --global html-dist

## Usage

Given this index.html file:

```html
<!DOCTYPE html>
<html>
  <head>
  </head>
  <body>
    <script src='dev.js'></script>
  </body>
</html>
```

Running:

```sh
html-dist index.html --remove-all --minify --insert foo.js
```

Will output:

```html
<!DOCTYPE html><html><head></head><body><script src="foo.js"></script></body></html>
```

## CLI Options

`-r` or `--remove-all`: removes all script tags in the input file

`-m` or `--minify`: minify the HTML before outputting it

`-i file` or `--insert file`: appends a script tag to the `body` tag for the filename

`-o output.html` or `--output output.html`: write file instead of printing to STDOUT.

## Multiple Inserts

You can insert many files into the HTML:

```sh
html-dist index.html --insert foo.js --insert bar.js
```





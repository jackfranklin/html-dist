# 0.3.1
- `html-dist` will now keep doctypes, rather than strip them out.

# 0.3.0
- __BREAKING__: config files are not run through Babel. This means they must be in a format that is supported by the Node version you're running.

# 0.2.2
- Fixed an issue that stopped the CLI running in npm installs
- Fixed html-dist removing the entire `head` or `body` if you didn't supply any config for them

# 0.2.1
- Added `link` helper
- `script` helper can take any properties
- expose `h` for creating custom trees
- vast amount of documentation

# 0.2.0
- First new release!

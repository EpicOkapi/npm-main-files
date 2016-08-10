npm-main-files
=====
Front-end users of npm instead of bower deserve some of that automagic resource exploring love too. Excuse my bad documenting, I don't feel like doing it atm.

Look for resources in npm modules, like retrieving all css files to include in your automatic build process or something, pretty neado right.

Instructions
-----
Some instructions because why not. It looks for all files in the files array and main file of a package.json, while also applying a glob.
Here is a code example that finds all js files, you can figure it out:
```
var mainNpmFiles = require('npm-main-files');

mainNpmFiles('**/*.js');
```
See, that was easy. Missed anything ? Check the source, it's a fairly small file :)

Here is some options you can send along:
nodeModules - Location of your modules, defaults to './node_modules'
pkgJson - Location of your package.json, defaults to './package.json'
onlySpecified - Shitty naming, I know. Basically decides if you only want to retrieve the files specified by the package.json or just all files from the package, ah yeah both still have the glob applied of course, defaults to: true

License
-----

MIT License

Copyright (c) 2016 Lorenzo Vuur lorenzo@vuur.me

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

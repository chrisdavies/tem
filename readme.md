# tem, a small, fast, flexible template engine in JavaScript

- Tiny (less than 1KB)
- As fast (or nearly) as doT
- Support for master pages
- Support for partials
- Pluggable (add your own commands)

[![Build Status](https://travis-ci.org/chrisdavies/tem.svg?branch=master)](https://travis-ci.org/chrisdavies/tem)

## Usage

- Adding your own commands
- Using partials
- Using masters
- Conditionals
- Loops
- Escaping
- Raw output

## Installation

Just download tem.min.js, or use bower:

    bower install tem

Or use npm:
https://www.npmjs.com/package/tem

    npm install --save tem

## Contributing

Make your changes (and add tests), then run the tests:

    npm test

If all is well, build your changes:

    npm run min

This minifies tem, and tells you the size. It's currently less than 1KB, and
I'd like to keep it that way!

## License MIT

Copyright (c) 2015 Chris Davies

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

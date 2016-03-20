# auto-toc.js
:book: On the fly TOC generator

Creates a table of contents automatically in your generated markdown or any other HTML page.

## Demo
Try the [online editor](http://timaschew.github.io/auto-toc.js/)

## Why another TOC generator?

Of course there are already tools to generate a TOC, but they need to be
executed during build time. If you convert markdown to HTML you need a build
process anyway, but generation of a TOC might be another build step in your pipeline,
if you don't use Jeykell with Kramdown.

This library generates the TOC at runtime in the browser. If you use plain HTML
this library can help you to avoid updating your TOC at build time completely.

There are also some runtime generators, but they are build on top of jQuery.
This library has no dependencies and still works on IE9 ;)


## Usage

---

__NOTE__ This won't work for your README.md files on github.com, [see here why](http://stackoverflow.com/questions/21340803/embed-javascript-in-github-readme-md).  
This feature needs to be provided by GitHub, see [here](https://github.com/isaacs/github/issues/215)

---

You can use this with README.md files on your [GitHub pages](https://pages.github.com/) or any other
pages, where you have control to the (sub)domain.


##### Your README.md before

```markdown
# My fancy library
## Installation
### Windows
### OSX
## Usage
### Basic
### Advanced
```

Assuming all the headings are children of a div with the class `content` in your generated HTML file.
Then just add a div element with a special class and add two script tags:

```markdown
# My fancy library
## Table of contents
<div class="toc-placeholder"></div>
## Installation
### Windows
### OSX
## Usage
### Basic
### Advanced
<script src="https://cdn.jsdelivr.net/auto-toc.js/0.0.5/dist.js"></script>
<script>
  autoToc('.content', '.toc-placeholder');
</script>
```

### API
##### autoToc(contentSelector, placeholderSelector, options)

- __contentSelector__ - CSS selector of the parent of all headings
- __placeholderSelector__ - CSS selector where to inject the TOC
- __contentSelector__ - options object
  - __max__ - Maximum heading level for TOC generation
  - __ignore__ - Array of strings which will be ignored for TOC generation

### Embed auto-toc.js

You can either use [jsdelivr](https://www.jsdelivr.com/) to embed auto-toc.js (see example above) to your page or install it via npm:

```
npm i auto-toc --save
```

auto-toc.js is bundled as Universal Module Defition.
So you can use it with CommonJS, AMD or just via
the global window scope.

##### CommonJS
```js
var autoToc = require('auto-toc')
```

## Ignoring headings via CSS class
You can also ignore headings by using the `toc-ignore` class:

```html
<h2 class="toc-ignore">Ignore this heading in the TOC</h2>
```


## Allowed Headings
```html
<h1>, <h2>, <h3>, <h4>, <h5>, <h6>
```

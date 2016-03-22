# auto-toc.js
:book: minimal 1KB on-the-fly TOC generator

Creates a table of contents automatically in your generated markdown or any other HTML page.

## Demo
Try the [online editor](http://timaschew.github.io/auto-toc.js/)

## Why another TOC generator?

Of course there are already tools to generate a TOC, but they need to be
executed during build time. If you convert markdown to HTML you need a build
process anyway, but generation of a TOC might be another build step in your pipeline,
if you don't use [Jekyll](https://jekyllrb.com/docs/configuration/#default-configuration) with [Kramdown](http://maruku.rubyforge.org/maruku.html#toc-generation) which suports a TOC out of the box.

This library generates the TOC at runtime in the browser. If you use HTML (not generated from markdown)
you can use this library as well. It helps you to avoid updating your TOC at build time completely.

### Comparision:

| Name                  | Type              | Size, gzip    |
| -------------         |:-------------:    |:-------------:|
| [markdown-toc][1]     | Buildtime         | -             |
| [doctoc][2]           | Buildtime         | -             |
| auto-toc.js           | Runtime, minimal  | 1.0k          |
| [contents][3]         | Runtime, advanced | 23k           |
| [TOC][4]              | Runtime, jQuery   | 1.2k + jQuery |
| [jquery.tocify][5]    | Runtime, jQuery   | 2.3k + jQuery |


[1]: https://github.com/jonschlinkert/markdown-toc
[2]: https://github.com/thlorenz/doctoc
[3]: https://github.com/gajus/contents
[4]: https://github.com/jgallen23/toc
[5]: https://github.com/gfranko/jquery.tocify.js

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
<script src="https://cdn.jsdelivr.net/auto-toc.js/0.0.6/dist.js"></script>
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

### See it in action

- js-joda
  - [result](http://pithu.github.io/js-joda/cheat-sheet.html)
  - [setup with GitHub Pages + include external md file ](https://github.com/pithu/js-joda/blob/gh-pages/cheat-sheet.html)

### CommonJS
```js
var autoToc = require('auto-toc')
```

### Ignoring headings via CSS class
You can also ignore headings by using the `toc-ignore` class:

```html
<h2 class="toc-ignore">Ignore this heading in the TOC</h2>
```

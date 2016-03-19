# auto-toc.js
:book: On the fly TOC generator

Creates a table of contents automatically in your generated markdown or any other HTML page

## Usage

---

__NOTE__ This won't work for you README files on github.com, [see here why](http://stackoverflow.com/questions/21340803/embed-javascript-in-github-readme-md).  
This feature need to be provided by GitHub, see [here](https://github.com/isaacs/github/issues/215)

---

You need to have control of the HTML, like on the gh-pages branch or your own page.


Write your Readme in your favorite way, for instance markdown:

```markdown
# My fancy library
## Installation
### Windows
### OSX
## Usage
### Basic
### Advanced
```

Assuming all the headers are children of a div with the class `content` in your generated HTML file.
Then just add a div element with a special class and add two script tags:

```markdown
# My fancy library
## Table of contents
<div class="toc-placeholder></div>
## Installation
### Windows
### OSX
## Usage
### Basic
### Advanced
<script src="https://cdn.jsdelivr.net/auto-toc.js/0.0.1/index.js"></script>
<script>
  autoToc('.content', '.toc-placeholder', {
    ignore: ['My fancy library', 'Table of contents']
  });
</script>
```

### API
##### autoToc(contentSelector, placeholderSelector, options)

- __contentSelector__ CSS selector of the parent of all headers
- __placeholderSelector__ CSS selector of the element where the TOC should be injected to, the element should already exists
- __contentSelector__ options object
  - __ignore__ Array of strings which will be ignored for TOC generation

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

## Ignoring headers via CSS class
You can also ignore headers by using the `toc-ignore` class:

```html
<h2 class="toc-ignore">Ignore this header in the TOC</h2>
```
or with [karmdown](http://kramdown.gettalong.org/) (markdown + CSS classes and more)

```markdown
## Ignore this header in the TOC
{: .toc-ignore}
```

## Allowed Headers
```html
<h1>, <h2>, <h3>, <h4>, <h5>, <h6>
```

## Demo
See here a [demo for js-joda cheat sheet](http://timaschew.github.io/auto-toc.js/)


## Cooming soon:
- specify max heading level

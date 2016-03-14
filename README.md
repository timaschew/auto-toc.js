# auto-toc.js
:book: On the fly TOC genertor

Creates a table of contents automatically in your generated markdown or any other HTML page

## Usage

__NOTE__ This won't work on github.com, [see here why](http://stackoverflow.com/questions/21340803/embed-javascript-in-github-readme-md).

You need to have control of the HTML, like on the gh-pages branch or your own page.


Write your Readme of whatever in your way, for instance markdown.

```md
# My fance library

## Installtion
### Window
### OSX
## Usage
### Basic
### Advanced
```

Assuming all the headers are children of a div with the class `content` in your generated HTML file.
Then just add a div element with a special class and add two script tags:

```md
# My fance library
# Table of contents
<div class="toc-placeholder></div>
## Installtion
### Window
### OSX
## Usage
### Basic
### Advanced
<script src="https://cdn.rawgit.com/timaschew/auto-toc.js/306866287772ba9fce0a2bfa8b6d4b4e20824d58/index.js"></script>
<script>
  makeToc('.content', {
    ignore: ['My fance library', 'Table of contents']
  });
</script>
```

See here a [demo for js-joda cheat sheet](http://timaschew.github.io/auto-toc.js/)

You can also ignore headers by using the `toc-ignore` class.

Headers need to be direct children of the selector which is passed in `makeToc`.

Allowed Headers: h1, h2, h3, h4, h5, h6

Cooming soon:
- specify max heading level
- implement missing handling of a use case: allow headings with a level lower than 2 of its previous sibling.

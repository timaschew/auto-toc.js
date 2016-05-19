var CodeMirror = require('codemirror');
require('codemirror/addon/mode/overlay.js');
require('codemirror/mode/xml/xml.js');
require('codemirror/mode/markdown/markdown.js');
require('codemirror/mode/gfm/gfm.js');

var fs = require('fs');
var mdContent = fs.readFileSync(__dirname + '/online-editor-content.md', {encoding: 'utf8'});

window.marked = require('marked');

function setText(elem, value) {
    if (elem.textContent != null) {
        elem.textContent = value;
    } else {
        elem.innerText = value;
    }
}

function updateOutput(markdownContent) {
  if (markdownContent == null) {
    markdownContent = editor.getValue();
  }
  htmlOutput.innerHTML = marked(markdownContent, {gfm: true});
  if (window.autoToc != null) {
    autoToc.update();
  }

  var height = parseInt(getComputedStyle(htmlOutput).height);
  editorContainer.style.height = height + 'px';
  editor.refresh();
}

window.contentContainer = document.querySelector('#codemirror-content-container');

window.textarea = document.querySelector('#code');
setText(textarea, mdContent);
window.htmlOutput = document.querySelector('#html-output');
window.editor = CodeMirror.fromTextArea(textarea, {
  mode: 'gfm',
  lineNumbers: true,
  theme: "default"
});

window.editorContainer = editor.display.input.wrapper = document.querySelector(".cm-s-default");
editor.on('change',function(cMirror) {
  updateOutput(cMirror.getValue());
});


// initial render
setTimeout(updateOutput)

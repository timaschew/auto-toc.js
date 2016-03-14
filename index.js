function makeToc(selector, options) {
  if (selector == null) {
    throw new Error('need to provide a selector where to scan for headers');
  }
  var allChildren = Array.prototype.slice.call(document.querySelectorAll(selector + ' > *'));
  var headers = allChildren.filter(function(item) {
    if (item.classList.contains("toc-ignore")) {
      return false;
    }
    if ((options.ignore || []).indexOf(item.textContent) != -1) {
      return false;
    }
    var splitted = item.nodeName.split('');
    var headingNumber = parseInt(splitted[1]);
    if (splitted[0] === 'H' && headingNumber >= 1 && headingNumber <= 6) {
      return true;
    }
  });
  var hierarchy = createHierarchy(headers);
  var toc = parseNodes(hierarchy.nodes);
  var container = document.querySelector('.toc-placeholder');
  container.textContent = '';
  container.appendChild(toc);
}

function createHierarchy(headers) {
  var hierarchy = { nodes: [] };
  var previousNode = { parent: hierarchy };
  var level = null;
  headers.forEach(function(header) {
    var headingNumber = parseInt(header.nodeName.substr(1));
    if (level == null) {
      level = headingNumber;
    }
    var object = {
      title: header.textContent,
      link: window.location.pathname + '#' + header.id,
      originLevel: headingNumber,
      nodes: []
    };
    if (headingNumber === level) {
      object.parent = previousNode.parent;
      // keep level
    } else if (headingNumber - level === 1) {
      // go one step deeper
      object.parent = previousNode;
      level++;
    } else if (headingNumber - level > 1) {
      // go one step deeper, but heading would go more deeper
      object.parent = previousNode;
      level++;
    } else if (headingNumber - level === -1) {
      // go one step up again
      object.parent = previousNode.parent.parent;
      level--;
    } else if (headingNumber - level < -1) {
      // TODO: need to go up multiple levels
      console.warn('NOT IMPLEMENTED YET (skipping)')
      return
    } else {
      console.error('unkown toc path');
    }
    object.parent.nodes.push(object);
    previousNode = object;
  });
  return hierarchy;
}

function parseNodes(nodes) {
    var ul = document.createElement("UL");
    for(var i=0; i<nodes.length; i++) {
    	ul.appendChild(parseNode(nodes[i]));
    }
    return ul;
}

function parseNode(node) {
    var li = document.createElement("LI");
    var a = document.createElement("A");
    console.log(node)
    a.innerText = node.title;
    a.href = node.link;
    li.appendChild(a);
    if(node.nodes) {
      li.appendChild(parseNodes(node.nodes));
    }
    return li;
}

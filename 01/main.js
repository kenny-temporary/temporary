function generateCollectionFragment(pages = []){
    const fragment = document.createDocumentFragment();
    pages.forEach(page => fragment.appendChild(template(page)));
    
    return fragment;
}

function appendListToContainer(pages = [], root){
    document
        .querySelector(root)
        .appendChild(generateCollectionFragment(pages))
}

function template(page){
    const aTag = document.createElement('a');
    const itemNode = document.createElement('li');
    const itemText = document.createTextNode(page.text);

    aTag.href = page.href;

    itemNode.appendChild(itemText);
    aTag.appendChild(itemNode);

    return aTag;
}

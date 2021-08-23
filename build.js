const fs = require('fs');
const path = require('path');

const dirname = path.join(__dirname, './');

const defaultEntryHTMLOptions = {
    filename: 'index.html',
    title: '训练项目',
    entries: [],
}


function isDirectory(path){
    return fs.statSync(path).isDirectory()
}



function getDirectoryNameAndPath(filters = []){
    return fs.readdirSync(path.join(__dirname, './'))
        .map(name => {
            const absolutePath = path.join(dirname, name);
            const needFilter = filters.includes(name);

            if(isDirectory(absolutePath) && !needFilter) {
                return { name, path: absolutePath };
            }
        }).filter(Boolean);
}



function generateEntry(options, callback) {
    const { filename, title, entries } = { ...defaultEntryHTMLOptions, ...options };
    const collection = generateCollection(entries);
    createFile(filename, { title, collection });
}



function generateCollection(entries = []){
    let content = '';
    entries.forEach(entry => { content += templateItem(entry) })
    return content;
}



function createFile(name, data){
    fs.writeFileSync(name, templateEntry(data), 'utf8');
}



function templateItem(entry){
    const relativeHref = './' + entry.name + '/index.html';
    return `
        <a href='${relativeHref}'>
            <li>${entry.name || ''}</li>
        </a>`
}



function templateEntry(data){
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${data.title}</title>
    </head>
    <body>
        <h2>企业基础练习作业</h2>
        <ul>
            ${ data.collection }
        </ul>
    </body>
    </html>
    `
}

function start(){
    generateEntry({ 
        filename: 'index.html',
        title: '企业训练导航页面',
        entries: getDirectoryNameAndPath(['.git', 'node_modules'])
    });
}

start()
const tokenise = require('./js/lexer');
const parse = require('./js/parser');
const fs = require('fs');

fs.readFile('./examples/helloworld.vl', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }
    var toks = tokenise(data);
    parse(toks);
});
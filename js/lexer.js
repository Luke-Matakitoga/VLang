const TokenType = require('./token');

function alpha(char) {
    return /^[A-Za-z]$/.test(char);
}

function numeric(char) {
    return /^[0-9]$/.test(char);
}


reserved = [
    "int",
    "string",
    "print"
];

ignore = [
    ' ',
    '\t',
    '\n',
    '\r'
];

function tokenise(source){
    var current = 0;
    var toks = [];
    while(current<source.length){
        if(source[current] == ' ' || source[current] == '\t' || source[current] == '\n'){
            current++;
            continue;
        }else if(numeric(source[current])){
            var num = "";
            while(numeric(source[current])){
                num+=source[current];
                current++;
            }
            toks.push({"Type": TokenType.NUM, "Value": num});
            continue;
        }else if(source[current] == ';'){
            toks.push({"Type": TokenType.EOL, "Value": source[current]});
            current++;
            continue;
        }else if(source[current] == '='){
            toks.push({"Type": TokenType.ASSIGN, "Value": source[current]});
            current++;
            continue;
        }else if(source[current] == '('){
            toks.push({"Type": TokenType.LPAR, "Value": source[current]});
            current++;
            continue;
        }else if(source[current] == ')'){
            toks.push({"Type": TokenType.RPAR, "Value": source[current]});
            current++;
            continue;
        }else if(source[current] == '+'){
            toks.push({"Type": TokenType.PLUS, "Value": source[current]});
            current++;
            continue;
        }else if(source[current] == '-'){
            toks.push({"Type": TokenType.MINUS, "Value": source[current]});
            current++;
            continue;
        }else if(source[current] == '"'){
            var string = "";
            current++;
            while(source[current] != '"'){
                string+=source[current];
                current++;
            }
            toks.push({"Type": TokenType.STRING, "Value": string});
            current++;
            continue;
        }else if(alpha(source[current])){
            var identifier = "";
            while(alpha(source[current])){
                identifier+=source[current];
                current++;
            }
            if(reserved.includes(identifier)){
                toks.push({"Type":TokenType.INDENTIFIER, "Value": identifier});
            }else{
                toks.push({"Type":TokenType.KEYWORD, "Value": identifier});
            }
            continue;
        }else{
            current++;
            continue;
        }

        
    }

    // toks.forEach(tok => {
    //     console.log(`${tok.Type}: ${tok.Value}`);
    // });

    return toks;
}

module.exports = tokenise;
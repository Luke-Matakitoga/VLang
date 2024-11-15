const TokenType = require('./token');

function parse(toks){
    var current = 0;
    var varStack = [];
    while(current<toks.length){
        if(toks[current].Type == TokenType.INDENTIFIER){
            var keyword = toks[current].Value;
            current++;
            if(toks[current].Type == TokenType.LPAR){
                var params = "";
                while(toks[current].Type != TokenType.RPAR){
                    current++;
                    if(toks[current].Type == TokenType.KEYWORD){
                        // This means the parameter is a keyword
                        params = varStack.find(x => x.Name == toks[current].Value).Value;
                    }else if(toks[current].Type == TokenType.STRING){
                        params = toks[current].Value;
                    }
                    else if(toks[current].Type == TokenType.NUM){
                        params = toks[current].Value;
                    }
                }
                // We've hit the right parenthesis, run the method!
                switch(keyword){
                    case "print":
                        console.log(params);
                        break;
                }
                continue;
            }else{
                // this is a variable being set!
                var name = toks[current].Value;
                current+=2;
                var expression = "";
                var type = toks[current].Type;
                while(toks[current].Type != TokenType.EOL){
                    if(toks[current].Type || toks[current.Type] == TokenType.PLUS || toks[current.Type] == TokenType.MINUS){
                        expression += toks[current].Value;
                    }
                    current++;
                }
                if(type == TokenType.NUM){
                    varStack.push({"Type":keyword, "Name":name, "Value":eval(expression)});
                }else{
                    varStack.push({"Type":keyword, "Name":name, "Value":expression});
                }
                
                current++;
                continue;
            }
        }else{
            current++;
            continue;
        }
    }
}

module.exports = parse;
const TokenType = require('./token');

var line = 1;

systemMethods = [
    {"identifier": "print", "code": (message) => {console.log(message)}},
    {"identifier": "square", "code": (number) => {return number * number}}
];

function parse(toks){
    line = 1;
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
                        var variable = varStack.find(x => x.Name == toks[current].Value);
                        if(variable != undefined){
                            params = variable.Value;
                        }else{
                            Error(`V01 Variable ${toks[current].Value} not found.`);
                            return;
                        }
                    }else if(toks[current].Type == TokenType.STRING){
                        params = toks[current].Value;
                    }
                    else if(toks[current].Type == TokenType.NUM){
                        params = toks[current].Value;
                    }
                }
                // We've hit the right parenthesis, run the method!
                if(systemMethods.find(m => m.identifier == keyword)){
                    systemMethods.find(m => m.identifier == keyword).code(params);
                }

                continue;
            }else{
                // this is a variable being set!
                var name = toks[current].Value;
                current+=2;
                var expression = "";
                while(toks[current].Type != TokenType.EOL){
                    line++;
                    if(toks[current].Type == TokenType.KEYWORD){
                        var variable = varStack.find(x => x.Name == toks[current].Value);
                        if(variable != undefined){
                            expression += variable.Value;
                        }else{
                            Error(`ERR-V001: Variable ${toks[current].Value} not found.`, );
                            return;
                        }
                    }
                    else if(toks[current].Type || toks[current.Type] == TokenType.PLUS || toks[current.Type] == TokenType.MINUS|| toks[current.Type] == TokenType.DIVIDE || toks[current.Type] == TokenType.MULTIPLY){
                        expression += toks[current].Value;
                    }
                    current++;
                }
                var result = eval(expression) ?? expression;

                varStack.push({"Type":keyword, "Name":name, "Value":eval(result)});
                
                current++;
                continue;
            }
        }else{
            current++;
            continue;
        }
    }
}

function Error(message){
    red = "\x1b[31m";
    console.log(`${red}ln${line} ${message}`);
}

module.exports = parse;
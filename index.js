let preAns = ''
let mode = 'D'

window.onload() = function(){
    document.getElementById('')
}

function Calculate(expression){

    let terms = tokenize(expression)
    let postFix = BODMAS(terms)
    let awnser = evaluateExpression(postFix)
    preAns = awnser

    return awnser
}

function tokenize(expression){
    return expression.match(/(\d+(\.\d+)?|[+\-*/^()×÷]|\b(sin|cos|tan|log|√)\b)/g);
}

function BODMAS(terms){// uses shuntingyard algorithm
    const precedence = { '+': 1, '-': 1, '*': 2, '×': 2, '÷':3 , '/': 3, '^': 4 , '√': 4 ,'sin': 5 ,'cos': 5 ,'tan': 5,'log': 5};
    const stack = [];
    const values = [];
    console.log(terms)

    // add edge cases for no closing or opening brackets---- invalid expressions

    terms.forEach(
        term => {
        if (!isNaN(term)) {// If the term is a value and not undefined, immediatly push it to the values array.

            values.push(term);

        } else if (term === '(') {// opening bracket indicates there is a start of a sub-expression that needs to be processed 

            stack.push(term);

        } else if (term === ')') {// when the closing bracket is found 

            while (stack.length && stack[stack.length - 1] !== '(') {// process the subexpression untill the opening bracket is found again
                values.push(stack.pop()); //add the operators to the values array for postfix expression
            }

            stack.pop();// removes the bracket added earlier to start the sub-expression
        } else {// if operator is found

            while (stack.length && precedence[stack[stack.length - 1]] >= precedence[term]) {//check if operator is the greater precedence
                values.push(stack.pop());//if less or equal precedence then add the higher precedence first to the values 
            }

            stack.push(term);// if higher precedence add current operator to the values array instead
        }
    });

    while (stack.length) {// remainder of operators are added to the values array
        values.push(stack.pop());
    }
    console.log(values)
    return values;
}

function evaluateExpression(expression){
    let calculations = []
    let a = ''
    let b = ''

    expression.forEach(
    term =>{
    if (term=='sin' || term=='cos' || term =='tan' || term=='log'){
        a = calculations.pop()
        b = ''
    }else if(isNaN(term)){
        b = calculations.pop()
        a = calculations.pop()
    }else{
        calculations.push(parseFloat(term))
    }
    switch(term) {
        case '+':
            calculations.push(a + b)
            break;
        case '-':
            calculations.push(a - b)
            break;
        case '*':
            calculations.push(a * b)
            break;
        case '/':
            calculations.push(a / b)
            break;
        case '×':
            calculations.push(a * b)
            break;
        case '÷':
            calculations.push(a / b)
            break;
        case '^':
            calculations.push(Math.pow(a,b))
            break;
        case 'sin':
            calculations.push(Math.sin(a))
            break;
        case 'cos':
            calculations.push(Math.cos(a))
            break;
        case 'tan':
            calculations.push(Math.tan(a))
            break;
        case 'log':
            calculations.push(Math.log10(a))
            break;
          }

    }

    )
    
    return calculations.pop()
}


 

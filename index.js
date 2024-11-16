
function Calculate(){
    //add trig and math functions here
}

function tokenize(expression){
    return expression.match(/(\d+(\.\d+)?|[+\-*/^()×÷])/g);
}

function BODMAS(terms){// uses shuntingyard algorithm
    const precedence = { '+': 1, '-': 1, '*': 2, '×': 2, '÷':3 , '/': 3, '^': 4 };
    const stack = [];
    const values = [];

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

    return values;
}

function evaluateExpression(expression){
    let a = ''
    let b = ''
     
    expression.forEach(
    term =>{
    switch(expression) {
        case '+':
        
        case '-':

              break;
        case '*':

              break;
        case '/':

              break;
        case '×':

              break;
        case '÷':

              break;
        default:
            if (a!=''){
                b=expression
            }else if(a){
                a=expression
            }else{
            }
          }

    }

    )
}

 

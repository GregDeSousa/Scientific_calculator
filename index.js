let preAns = 0
let mode = 2
const modes = {'Deg':1, 'Rad':2,'Grad':3}
const textArea = document.getElementById("display");
const moveLeftButton = document.getElementById("moveLeftButton");
const moveRightButton = document.getElementById("moveRightButton");

window.onload = function() {
        loadDRG();
};


moveLeftButton.addEventListener("click", () => {
    moveCursor(-1);
});

moveRightButton.addEventListener("click", () => {
    moveCursor(1);
});

function moveCursor(direction) {
    // Get the current cursor position
    let currentPosition = textArea.selectionStart;

    // Calculate the new cursor position
    let newPosition = currentPosition + direction;

    // Make sure the new position is within the bounds
    if (newPosition >= 0 && newPosition <= textArea.value.length) {
        // Set the new cursor position
        textArea.setSelectionRange(newPosition, newPosition);
    }
}

function Calculate(expression){

    let terms = tokenize(expression)
    let postFix = BODMAS(terms)
    let awnser = evaluateExpression(postFix)
    preAns = awnser
    
    console.log(awnser)


    return awnser
}

function indicatorON(id){
    let indicator = document.getElementById(id)
    indicator.style.backgroundColor = '#432000'
    indicator.style.borderColor = 'white'
    indicator.style.color = 'white'
}

function indicatorOFF(id){
    let indicator = document.getElementById(id)
    indicator.style.backgroundColor = 'transparent'
    indicator.style.borderColor = '#432000'
    indicator.style.color = '#432000'
}

function loadDRG(){//chaneg mode degree, radians, gradians
    switch(mode){
        case 1:
            indicatorON('deg')
            indicatorOFF('rad')
            indicatorOFF('grad')
            break;
        case 2:
            indicatorOFF('deg')
            indicatorON('rad')
            indicatorOFF('grad')
            break;
        case 3:
            indicatorOFF('deg')
            indicatorOFF('rad')
            indicatorON('grad')
            break;
    }
}

function toggleDRG(){//toggle modes
    mode+=1
    if (mode>=4){
        mode=1
    }
    loadDRG();
}

function tokenize(expression) {
    const tokens = [];
    const regex = /logbase|[+\-*/^()×÷√π]|sin|cos|tan|log|abs|ans|\d+(\.\d+)?/g;
    let match;
    let lastToken = null;

    while ((match = regex.exec(expression)) !== null) {
        let token = match[0];

        // Handle unary minus
        if (token === "-" && (lastToken === null || /[+\-*/^(×÷]/.test(lastToken))) {
            // If previous token is null or an operator, treat "-" as unary minus
            match = regex.exec(expression); // Get the next token
            if (match) {
                token = `-${match[0]}`; // Combine "-" with the next number
            } else {
                throw new Error("Invalid syntax: Standalone '-'");
            }
        }

        tokens.push(token);
        lastToken = token;
    }
    console.log(tokens)
    return tokens;
}

function BODMAS(terms){// uses shuntingyard algorithm
    const precedence = { 'π':1,'+': 1, '-': 1, '*': 2, '×': 2, '÷':3 , '/': 3, '^': 4 , '√': 4 ,'sin': 5 ,'cos': 5 ,'tan': 5,'log': 5,'logbase':5, 'abs':5};
    const stack = [];
    const values = [];


    terms.forEach(
        term => {
        console.log(term)
        if (!isNaN(term) || term=="ans" ||term =="π") {// If the term is a value and not undefined, immediatly push it to the values array.
            if(term=="ans"){
                values.push(preAns);
            }else if(term=="π"){
                console.log("HAPPPEND");
                values.push(3.14159);
            }else{values.push(term);}

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
    console.log(term)
    if (term=='sin' || term=='cos' || term =='tan' || term=='log' || term == "√" || term=="abs" || term=="logbase"){
        a = calculations.pop()
        b = term === 'logbase' ? calculations.pop() : null;
    }else if(isNaN(term)){
        b = calculations.pop()
        a = calculations.pop()
    }else{
        calculations.push(parseFloat(term))
    }
    switch(term) {// handle different operators
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
        case "√":
            calculations.push(Math.sqrt(a))
            break;
        case 'sin':
            a = convertValueDRG(a)
            calculations.push(Math.sin(a))
            break;
        case 'cos':
            a = convertValueDRG(a)
            calculations.push(Math.cos(a))
            break;
        case 'tan':
            a = convertValueDRG(a)
            calculations.push(Math.tan(a))
            break;
        case 'log':
            calculations.push(Math.log10(a))
            break;
        case 'logbase':
            calculations.push(Math.log(a) / Math.log(b)); 
            break;
        case 'abs':
            calculations.push(Math.abs(a))
            break;       
          }

    }

    )
    
    return calculations.pop()
}

function convertValueDRG(value){
    switch (mode) {
        case 1: // Degrees to radians
            value = value * (Math.PI / 180);
            break;
        case 2: //(no conversion needed)
            break;
        case 3: // Gradians to radians 
            value = value * (Math.PI / 200);
            break;
        default:
            throw new Error("Invalid mode");
    }
    return value
}




 

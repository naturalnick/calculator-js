
let firstNumber = 0;
let secondNumber = 0;
let memoryNumber = 0;

let operator = "";
let operatorSelected = false;
let operationReady = false

const numButtons = document.getElementsByClassName("num-btn");
const opButtons = document.getElementsByClassName("op-btn");
const memButtons = document.getElementsByClassName("mem-btn");
const equalButton = document.getElementById("eql-btn");
const clearButton = document.getElementById("clr-btn");

for (let button of numButtons) {
    button.addEventListener("click", generateNumber);
}

for (let button of opButtons) {
    button.addEventListener("click", selectOperator);
}

for (let button of memButtons) {
    button.addEventListener("click", function() {
        switch (button.textContent) {
            case "M+":
                addMemory();
                break;
                case "M-":
                subtractMemory();
                break;
                case "MR":
                recallMemory();
                break;
                case "MC":
                clearMemory();
                break;
            default:
                break;
        }
    });
}

equalButton.addEventListener("click", prepareCalculation);

clearButton.addEventListener("click", clearAll);

function generateNumber(event) {
    const numberPressed = event.target.textContent;
    if (operatorSelected) { // TODO
        setDisplayValue("");
        deselectOperator();
    }
    let numberStr = getDisplayValue();
    numberStr += numberPressed;
    setDisplayValue(numberStr);
    if (operator === "") { //operator is only empty while entering the firstNumber, replace with new boolean later
        firstNumber = parseFloat(numberStr);
    } else {
        secondNumber = parseFloat(numberStr);
        operationReady = true;
    }
}

function prepareCalculation() {
    if (operationReady) {
        operatorSelected = true;
        firstNumber = calculate(firstNumber, operator, secondNumber);
        firstNumber = formatResultForDisplay(firstNumber);
        setDisplayValue(firstNumber);
        secondNumber = 0;
        operationReady = false;
    }
}

function selectOperator(event) {
    if (firstNumber != 0) {
        if (secondNumber != 0 || operationReady) {
            prepareCalculation();
        }
        //need to add if statement to prevent multiple operators
        operator = event.target.textContent;
        event.target.classList.add("selected");
        operatorSelected = true;
    }
}

function formatResultForDisplay(number) {
    if (number % 1 != 0) {
        let resultStr = number.toString();
        if (resultStr.length > 10) { //need to factor in exponents here too
            resultStr = resultStr.slice(0, 10);
        }
        return parseFloat(resultStr);
    } else {
        return number;
    }
}

function calculate(num1, op, num2) {
    switch (op) {
        case "÷":
            return num1 / num2;
        case "x":
            return num1 * num2;
        case "-":
            return num1 - num2;
        case "+":
            return num1 + num2;
        default:
            break;
    }
}

function setDisplayValue(newValue) {
    document.getElementById("display").textContent = newValue;
}

function getDisplayValue() {
    return document.getElementById("display").textContent;
}

function deselectOperator() {
    operatorSelected = false;
    for (let button of opButtons) {
        if (button.classList.contains("selected")) {
            button.classList.remove("selected");
        }
    }
}

function clearAll() {
    setDisplayValue("");
    firstNumber = 0;
    secondNumber = 0;
    deselectOperator();
    operator = "";
}

function addMemory() {
    memoryNumber += parseFloat(getDisplayValue());
}

function subtractMemory() {
    memoryNumber -= parseFloat(getDisplayValue());
}

function recallMemory() {
    if (operatorSelected) {
        secondNumber = memoryNumber;
        setDisplayValue(secondNumber);
        deselectOperator();
        operationReady = true;
    }
}

function clearMemory() {
    memoryNumber = 0;
}

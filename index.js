
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
    button.addEventListener("click", function (event) {
        const newNum = concatenateNumber(button.textContent);
        setDisplayValue(newNum);
    });
}

for (let button of opButtons) {
    button.addEventListener("click", selectOperator);
}

for (let button of memButtons) {
    button.addEventListener("click", function () {
        switch (button.textContent) {
            case "M+":
            case "M-":
                changeMemory(button.textContent);
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

equalButton.addEventListener("click", performOperation);

clearButton.addEventListener("click", clearAll);

function concatenateNumber(num) {
    if (operatorSelected) {
        setDisplayValue("");
        deselectOperators();
    }
    let numberStr = getDisplayValue();
    numberStr += num;
    if (operator === "") { //operator is only empty while entering the firstNumber, this works, but replace with new boolean later
        firstNumber = parseFloat(numberStr);
    } else {
        secondNumber = parseFloat(numberStr);
        operationReady = true;
    }
    return numberStr;
}

function performOperation() {
    if (operationReady) {
        const newNum = operators[operator].operate(firstNumber, secondNumber);
        firstNumber = formatResultForDisplay(newNum);
        setDisplayValue(firstNumber);
        secondNumber = 0;
        operationReady = false;
    }
}

function selectOperator(event) {
    if (firstNumber != 0) {
        if (secondNumber != 0) performOperation();
        operator = event.target.textContent;
        deselectOperators();
        event.target.classList.add("selected");
        operatorSelected = true;
    }
}

//TODO add exponent functionality
//TODO save sliced decimals for use in calculation
function formatResultForDisplay(number) {
    if (number % 1 != 0) {
        let resultStr = number.toString();
        if (resultStr.length > 10) {
            resultStr = resultStr.slice(0, 10);
        }
        return parseFloat(resultStr);
    } else {
        return number;
    }
}

const operators = {
    "÷":
    {
        operate: function (num1, num2) { return num1 / num2; }
    },
    "x":
    {
        operate: function (num1, num2) { return num1 * num2; }
    },
    "-":
    {
        operate: function (num1, num2) { return num1 - num2; }
    },
    "+":
    {
        operate: function (num1, num2) { return num1 + num2; }
    }
}

function setDisplayValue(newValue) {
    document.getElementById("display").textContent = newValue;
}

function getDisplayValue() {
    return document.getElementById("display").textContent;
}

function deselectOperators() {
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
    deselectOperators();
    operator = "";
}

function changeMemory(button) {
    const valueOnDisplay = getDisplayValue();
    if (valueOnDisplay != "0" || valueOnDisplay != "") {
        switch (button) {
            case "M+":
                memoryNumber += parseFloat(valueOnDisplay);
                break;
            case "M-":
                memoryNumber -= parseFloat(valueOnDisplay);
                break;
        }
    }
}

function recallMemory() {
    if (firstNumber === 0) {
        firstNumber = memoryNumber
        setDisplayValue(firstNumber);
    }
    if (operatorSelected) {
        secondNumber = memoryNumber;
        setDisplayValue(secondNumber);
        deselectOperators();
        operationReady = true;
    }
}

function clearMemory() {
    memoryNumber = 0;
}

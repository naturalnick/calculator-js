
let firstNumber = 0;
let secondNumber = 0;
let memoryNumber = 0;

let operand = "";
let operatorSelected = false;
let operationReady = false

const buttons = document.getElementsByClassName("btn");

for (let button of buttons) {
    button.addEventListener("click", executeButton);
}

function executeButton(event) {
    const buttonPressed = event.target.textContent;

        if (parseInt(buttonPressed) || buttonPressed == 0 || buttonPressed === ".") {
            generateNumber(buttonPressed);
        } else {
            switch (buttonPressed) {
                case "C":
                    clearAll();
                    break;
                case "÷":
                case "x":
                case "-":
                case "+":
                    if (firstNumber != 0) {
                        if (secondNumber != 0 || operationReady) {
                            prepareCalculation();
                        }
                        //need to add if statement to prevent multiple operators
                        operand = buttonPressed;
                        event.target.classList.add("selected");
                        operatorSelected = true;
                    }
                    break;
                case "=":
                    if (operationReady) {
                        prepareCalculation();
                    }
                    break;
                case "M+":
                    memoryNumber += parseFloat(getDisplayValue());
                    break;
                case "M-":
                    memoryNumber -= parseFloat(getDisplayValue());
                    break;
                case "MR":
                    if (operatorSelected) generateNumber(memoryNumber);
                    break;
                case "MC":
                    memoryNumber = 0;
                    break;
                default:
                    break;
            }
        }
}

function clearAll() {
    setDisplayValue("0");
    firstNumber = 0;
    secondNumber = 0;
    operatorSelected = true;
    deselectOperand();
    operand = "";
}

function generateNumber(numStr) {
    if (operatorSelected) {
        setDisplayValue("");
        operatorSelected = false;
        deselectOperand();
    }
    let numberStr = getDisplayValue();
    numberStr += numStr;
    setDisplayValue(numberStr);
    if (operand === "") { //operand is only empty while entering the firstNumber, replace with new boolean later
        firstNumber = parseFloat(numberStr);
    } else {
        secondNumber = parseFloat(numberStr);
        operationReady = true;
    }
}

function calculate(num1, op, num2) {
    let result = 0;
    switch (op) {
        case "÷":
            result = num1 / num2;
            break;
        case "x":
            result = num1 * num2;
            break;
        case "-":
            result = num1 - num2;
            break;
        case "+":
            result = num1 + num2;
            break;
        default:
            break;
    }
    if (result % 1 != 0) {
        let resultStr = result.toString();
        if (resultStr.length > 10) { //need to factor in powers here too
            resultStr = resultStr.slice(0, 10)
            result = parseFloat(resultStr);
        }
        return result;
    } else {
        return result;
    }
}

function prepareCalculation() {
    operatorSelected = true;
    firstNumber = calculate(firstNumber, operand, secondNumber);
    secondNumber = 0;
    setDisplayValue(firstNumber);
    operationReady = false;
}

function setDisplayValue(newValue) {
    document.getElementById("display").textContent = newValue;
}

function getDisplayValue() {
    return document.getElementById("display").textContent;;
}

function deselectOperand() {
    Array.from(buttons).forEach(element => {
        if (element.classList.contains("selected")) {
            element.classList.remove("selected");
        }
    })
}

let firstNumber = 0;
let secondNumber = 0;
let memoryNumber = 0;

let operand = "";
let operatorSelected = false;
let operationReady = false

const buttons = document.getElementsByClassName("btn");

Array.from(buttons).forEach(element => {
    element.addEventListener("click", function (event) {
        const buttonText = this.innerHTML;

        if (parseInt(buttonText) || buttonText == 0 || buttonText === ".") {
            generateNumber(buttonText);
            deselectOperand();
        } else {
            switch (buttonText) {
                case "C": //add cancel entry feature
                    setDisplayValue("0");
                    firstNumber = 0;
                    secondNumber = 0;
                    operatorSelected = true;
                    deselectOperand();
                    operand = "";
                    break;
                case "÷":
                case "x":
                case "-":
                case "+":
                    if (firstNumber != 0) {
                        if (secondNumber != 0) {
                            operatorSelected = true;
                            firstNumber = calculate(firstNumber, operand, secondNumber);
                            secondNumber = 0;
                            setDisplayValue(firstNumber);
                        }
                        operand = buttonText;
                        element.classList.add("selected");
                        operatorSelected = true;
                    }
                    break;
                case "=":
                    if (operationReady) {
                        operatorSelected = true;
                        firstNumber = calculate(firstNumber, operand, secondNumber);
                        secondNumber = 0;
                        setDisplayValue(firstNumber);
                        operationReady = false;
                    }
                    break;
                case "M+":
                    memoryNumber += parseFloat(getDisplayValue());
                    break;
                case "M-":
                    memoryNumber -= parseFloat(getDisplayValue());
                    break;
                case "MR":
                    setDisplayValue("");
                    generateNumber(memoryNumber);
                    operatorSelected = false;
                    break;
                case "MC":
                    memoryNumber = 0;
                    break;
                default:
                    break;
            }
        }
    });
});

// think of new function name
function generateNumber(numStr) {
    if (operatorSelected) {
        setDisplayValue("");
        operatorSelected = false;
    }
    let numberStr = getDisplayValue();
    numberStr += numStr;
    setDisplayValue(numberStr);
    if (operand === "") {
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

function setDisplayValue(newValue) {
    document.getElementById("display").innerHTML = newValue;
}

function getDisplayValue() {
    return document.getElementById("display").innerHTML;
}

function deselectOperand() {
    Array.from(buttons).forEach(element => {
        if (element.classList.contains("selected")) {
            element.classList.remove("selected");
        }
    })
}
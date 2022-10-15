

let firstNumber = 0;
let secondNumber = 0;
let operand = "";
let resetDisplay = false;

const buttons = document.getElementsByClassName("btn");

Array.from(buttons).forEach(element => {
    element.addEventListener("click", function (event) {
        const buttonText = this.innerHTML;

        if (parseInt(buttonText) || buttonText == 0 || buttonText === ".") {
            generateNumber(buttonText);
            deselectOperand();
        } else {

            switch (buttonText) {
                case "CE":
                    
                    break;
                case "÷":
                case "x":
                case "-":
                case "+":
                    secondNumber = firstNumber;
                    firstNumber = 0;
                    operand = buttonText;
                    element.classList.add("selected");
                    resetDisplay = true;
                    break;
                case "=":
                    firstNumber = calculate(firstNumber, operand, secondNumber);
                    secondNumber = 0;
                    document.getElementById("display").innerHTML = firstNumber;
                    break;
                case "M+":

                    break;
                case "M-":

                    break;
                case "MR":

                    break;
                case "MC":

                    break;
                default:
                    break;
            }
        }
    });
});



function generateNumber(numStr) {
    if (resetDisplay) document.getElementById("display").innerHTML = "";
    let numberStr = document.getElementById("display").innerHTML;
    numberStr += numStr;
    document.getElementById("display").innerHTML = numberStr;
    firstNumber = parseFloat(numberStr);
    console.log(firstNumber);
}

function calculate(num1, op, num2) {
    let result;
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
    console.log(result);
    return result.toFixed(3);
    //need to not show decimals.000
}



function deselectOperand() {

    Array.from(buttons).forEach(element => {
        if (element.classList.contains("selected")) {
            element.classList.remove("selected");
        }
    })
}


let firstNum = "";
let SecondNum = "";
let operand = "";

const buttons = document.getElementsByClassName("btn");

Array.from(buttons).forEach(element => {
    element.addEventListener("click", function (event) {
        const buttonText = this.innerHTML
        if (parseInt(buttonText) || buttonText == 0 || buttonText === ".") {
            generateNumber(buttonText);
        } else {

            switch (buttonText) {
                case "CE":
                    //clear
                    break;
                case "÷":
                    operand = buttonText;
                    break;
                case "x":
                    operand = buttonText;
                    break;
                case "-":
                    operand = buttonText;
                    break;
                case "+":
                    operand = buttonText;
                    break;
                case "=":
                    //calculate
                    break;
                case "M+":

                    break;
                case "M-":

                    break;
                case "MR":

                    break;
                case "MC":

                    break;
                case ".":
                    //maybe put decimal with numbers
                    break;
                default:
                    break;
            }
        }
    });
});

function generateNumber(numStr) {

}

function calculate(num1, op, num2) {
    //switch statement for operators
    //return result
}
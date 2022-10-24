let memoryNumber = 0;

let operationStarted = false;
let operatorSelected = false;
let operationReady = false;

const numButtons = document.getElementsByClassName("num-btn");
const opButtons = document.getElementsByClassName("op-btn");
const memButtons = document.getElementsByClassName("mem-btn");
const equalButton = document.getElementById("eql-btn");
const clearButton = document.getElementById("clr-btn");

//TODO add exponent functionality
//TODO save sliced decimals for use in calculation

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

const operation = {
	num1: 0,
	num2: 0,
	operator: "",
	operate() {
		switch (this.operator) {
			case "÷":
				return this.num1 / this.num2;
			case "x":
				return this.num1 * this.num2;
			case "-":
				return this.num1 - this.num2;
			case "+":
				return this.num1 + this.num2;
			default:
				break;
		}
	},
	reset() {
		this.num1 = 0;
		this.num2 = 0;
		this.operator = "";
	},
};

function performOperation(event) {
	if (operationReady) {
		const newNum = operation.operate();
		operation.num1 = formatResultForDisplay(newNum);
		setDisplayValue(operation.num1);
		if (operatorSelected) {
			operation.num2 = 0;
		} else {
			operation.reset();
		}
		operationReady = false;
		if (event.target.textContent === "=") {
			operationStarted = false;
		}
	}
}

function selectOperator(event) {
	if (operation.num1 != 0) {
		deselectOperators();
		event.target.classList.add("selected");
		operatorSelected = true;
		if (operation.num2 != 0) performOperation();
		operation.operator = event.target.textContent;
	}
}

function concatenateNumber(num) {
	if (operatorSelected) {
		setDisplayValue("0");
		deselectOperators();
	}
	if (!operationStarted) {
		setDisplayValue("0");
		operation.reset();
		operationStarted = true;
	}
	let numberStr = getDisplayValue();
	if (numberStr === "0") numberStr = "";
	numberStr += num;
	if (operation.operator === "") {
		//operator is only empty while entering the firstNumber, this works, but replace with new boolean later
		operation.num1 = parseFloat(numberStr);
		operationStarted = true;
	} else {
		operation.num2 = parseFloat(numberStr);
		operationReady = true;
	}
	return numberStr;
}

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
	setDisplayValue("0");
	operation.num1 = 0;
	operation.num2 = 0;
	deselectOperators();
	operation.operator = "";
}

function changeMemory(button) {
	const valueOnDisplay = getDisplayValue();
	if (valueOnDisplay != "0") {
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
	if (operation.num1 === 0) {
		operation.num1 = memoryNumber;
		setDisplayValue(operation.num1);
	}
	if (operatorSelected) {
		operation.num2 = memoryNumber;
		setDisplayValue(operation.num2);
		deselectOperators();
		operationReady = true;
	}
}

function clearMemory() {
	memoryNumber = 0;
}

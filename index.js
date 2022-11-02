//TODO add exponent functionality
//TODO save sliced decimals for use in calculation
//TODO add hover to buttons

const state = {
	currentOperator: "",
	num1: undefined,
	num2: undefined,
	reset() {
		this.currentOperator = "";
		num1 = undefined;
		num2 = undefined;
	},
};

const display = {
	set(newValue) {
		document.getElementById("display").textContent = this.format(newValue);
	},
	get() {
		return document.getElementById("display").textContent;
	},
	format(numStr) {
		if (Number(numStr) % 1 != 0) {
			let resultStr = number.toString();
			if (resultStr.length > 10) {
				resultStr = resultStr.slice(0, 10);
			}
			return parseFloat(resultStr);
		} else {
			return number;
		}
	},
};

display.set("0");

document.querySelectorAll(".num-btn").forEach((btn) =>
	btn.addEventListener("click", () => {
		state.num2 =
			state.num2 === undefined
				? (state.num2 = btn.textContent)
				: state.num2.concat(btn.textContent);
		display.set(state.num2);
		deselectOperators();
		console.log(state);
	})
);

document.querySelectorAll(".dec-btn").forEach((btn) =>
	btn.addEventListener("click", () => {
		state.num2 =
			state.num2 === undefined ? "0." : state.num2.concat(btn.textContent);
		display.set(state.num2);
		deselectOperators();
		console.log(state);
	})
);

const operatorButtons = document.querySelectorAll(".op-btn");
operatorButtons.forEach((btn) =>
	btn.addEventListener("click", (event) => {
		if (checkOperationStatus()) performOperation();
		if (state.num2 != undefined) {
			state.num1 = state.num2;
			state.num2 = undefined;
		}
		deselectOperators();
		event.target.classList.add("selected");
		state.currentOperator = event.target.dataset.operator;
		console.log(state);
	})
);

function deselectOperators() {
	document
		.querySelectorAll(".op-btn")
		.forEach((btn) => btn.classList.remove("selected"));
}

document.getElementById("clr-btn").addEventListener("click", () => {
	display.set("0");
	state.reset();
	deselectOperators();
});

const operators = {
	multiply: {
		calculate(num1, num2) {
			return num1 * num2;
		},
	},
	divide: {
		calculate(num1, num2) {
			return num1 / num2;
		},
	},
	subtract: {
		calculate(num1, num2) {
			return num1 - num2;
		},
	},
	add: {
		calculate(num1, num2) {
			return num1 + num2;
		},
	},
};

function operate(num1, num2, operator) {
	return String(operators[operator].calculate(Number(num1), Number(num2)));
}

document.getElementById("eql-btn").addEventListener("click", () => {
	if (checkOperationStatus()) performOperation();
});

function performOperation(event) {
	state.num1 = operate(state.num1, state.num2, state.currentOperator);
	state.num2 = undefined;
	state.currentOperator = "";
	display.set(state.num1);
}

function checkOperationStatus() {
	if (
		state.currentOperator != "" &&
		state.num1 != undefined &&
		state.num2 != undefined
	) {
		return true;
	} else return false;
}

document.querySelectorAll(".mem-btn").forEach((btn) =>
	btn.addEventListener("click", () => {
		switch (btn.textContent) {
			case "M+":
			case "M-":
				changeMemory(btn.textContent);
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
	})
);

let memoryNumber = 0;

function changeMemory(btn) {
	const valueOnDisplay = display.get();
	if (valueOnDisplay != "0") {
		switch (btn) {
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
	if (state.num1 === 0) {
		state.num1 = memoryNumber;
		display.set(state.num1);
	}
	if (state.currentOperator != "") {
		state.num2 = memoryNumber;
		display.set(state.num2);
		deselectOperators();
		operationReady = true;
	}
}

function clearMemory() {
	memoryNumber = 0;
}

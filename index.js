//TODO add exponent functionality
//TODO save sliced decimals for use in calculation

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
		document.getElementById("display").textContent = newValue;
	},
	get() {
		return document.getElementById("display").textContent;
	},
};

document.querySelectorAll(".num-btn").forEach((btn) =>
	btn.addEventListener("click", () => {
		state.num2 =
			state.num2 === undefined
				? (state.num2 = Number(btn.textContent))
				: Number(state.num2.toString().concat(btn.textContent));
		display.set(state.num2);
		deselectOperators();
		console.log(state);
	})
);

document.querySelectorAll(".dec-btn").forEach((btn) =>
	btn.addEventListener("click", () => {
		state.num2 =
			state.num2 === undefined
				? (state.num2 = 0.0)
				: Number(state.num2.toString().concat(btn.textContent));
		display.set(state.num2);
		deselectOperators();
		console.log(state);
	})
);

const operatorButtons = document.querySelectorAll(".op-btn");
operatorButtons.forEach((btn) =>
	btn.addEventListener("click", (event) => {
		if (state.num2 != undefined) {
			state.num1 = state.num2;
			state.num2 = undefined;
		}
		deselectOperators();
		event.target.classList.add("selected");
		state.currentOperator = event.target.dataset.operator;
		if (checkOperationStatus()) performOperation();
		console.log(state);
	})
);

function deselectOperators() {
	document
		.querySelectorAll(".op-btn")
		.forEach((btn) => btn.classList.remove("selected"));
}

document.getElementById("clr-btn").addEventListener("click", () => {
	console.log(state);
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
	return operators[operator].calculate(num1, num2);
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

document.getElementById("eql-btn").addEventListener("click", performOperation);

function performOperation(event) {
	if (checkOperationStatus()) {
		state.num1 = operate(state.num1, state.num2, state.currentOperator);
		state.num2 = undefined;
		display.set(formatForDisplay(state.num1));
		deselectOperators();
	}
	console.log(state);
}

function formatForDisplay(number) {
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

//TODO add exponent functionality
//TODO save sliced decimals for use in calculation
//TODO add hover to buttons

const state = {
	currentOperator: "",
	num1: undefined,
	num2: undefined,
	memory: undefined,
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
		if (numStr === undefined) return "0";
		if (Number(numStr) % 1 != 0) {
			let resultStr = numStr.toString();
			if (resultStr.length > 10) {
				resultStr = resultStr.slice(0, 10);
			}
			return parseFloat(resultStr);
		} else {
			return numStr;
		}
	},
};

display.set(state.num2);

document.querySelectorAll(".num-btn").forEach((btn) =>
	btn.addEventListener("click", () => {
		if (state.num2 != undefined) {
			state.num2 = state.num2.concat(btn.textContent);
		} else {
			state.num2 = btn.textContent === "." ? ".0" : btn.textContent;
		}
		display.set(state.num2);
		deselectOperators();
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
	})
);

function deselectOperators() {
	document
		.querySelectorAll(".op-btn")
		.forEach((btn) => btn.classList.remove("selected"));
}

document.getElementById("clr-btn").addEventListener("click", () => {
	state.reset();
	display.set(state.num2);
	deselectOperators();
	console.log(state);
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

document.getElementById("mem-btn-add").addEventListener("click", changeMemory);
document.getElementById("mem-btn-sub").addEventListener("click", changeMemory);

function changeMemory(event) {
	if (state.num1 != undefined || state.num2 != undefined) {
		const currentValue = Number(
			state.num2 === undefined ? state.num1 : state.num2
		);
		state.memory = String(
			(state.memory === undefined ? 0 : Number(state.memory)) +
				(event.target.textContent === "M+" ? currentValue : -currentValue)
		);
	}
	console.log(state);
}

document
	.getElementById("mem-btn-recall")
	.addEventListener("click", recallMemory);

function recallMemory() {
	console.log(state);
	if (state.num1 === undefined) {
		state.num1 = state.memory;
		display.set(state.num1);
	} else {
		state.num2 = state.memory;
		display.set(state.num2);
	}
	if (state.currentOperator != "") deselectOperators();
	console.log(state);
}

document.getElementById("mem-btn-clear").addEventListener("click", () => {
	state.memory = undefined;
});

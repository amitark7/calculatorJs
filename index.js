let totalExp = "";

let inputValue = document.getElementById("input-box");
function getPrecendence(operator) {
  if (operator === "*" || operator === "/") {
    return 3;
  } else if (operator === "+" || operator === "-") {
    return 2;
  }
  return 0;
}

function compute(expression) {
  let operand1 = 0;
  let operand2 = 0;
  let result;
  let backIndex, forwardIndex;
  let flag = true;
  while (flag) {
    let index = 0;
    let priority = 0;
    flag = false;

    //This loop for traverse whole string and check higher precendence.
    for (let i = 0; i < expression.length; i++) {
      if (
        (expression.charAt(i) >= "0" && expression.charAt(i) <= "9") ||
        expression.charAt(i) === "." ||
        (expression.charAt(i) === "-" && i === 0)
      ) {
        continue;
      }

      //Find index of Higher precendence operator and assign into index.
      if (getPrecendence(expression.charAt(i)) > priority) {
        index = i;
        priority = getPrecendence(expression.charAt(i));
      }
    }

    //Some temporary variable to store backward value and foward value of Operators.
    let tempOPerands = "";
    let backWardOperand = "";
    let forWardOperands = "";

    //Find Backward Operands of Operators.
    for (
      let backIterator = index - 1;
      (backIterator >= 0 &&
        expression.charAt(backIterator) >= "0" &&
        expression.charAt(backIterator) <= "9") ||
      expression.charAt(backIterator) === "." ||
      (expression.charAt(backIterator) === "-" && backIterator === 0);
      backIterator--
    ) {
      tempOPerands += expression.charAt(backIterator);
      backIndex = backIterator;
    }

    //Reverse Backward Operands and store in temp1 after got Backward Operands beacause when we traverse backward of Operators we got reverse number.
    backWardOperand = tempOPerands.split("").reverse().join("");

    //To find Forward Operands of Operators.
    for (
      let forwardIterator = index + 1;
      (forwardIterator < expression.length &&
        expression.charAt(forwardIterator) >= "0" &&
        expression.charAt(forwardIterator) <= "9") ||
      expression.charAt(forwardIterator) === "." ||
      (expression.charAt(forwardIterator) === "-" && forwardIterator === 0);
      forwardIterator++
    ) {
      forWardOperands += expression.charAt(forwardIterator);
      forwardIndex = forwardIterator;
    }
    //Convert String to Number.
    try {
      operand1 = parseFloat(backWardOperand);
      operand2 = parseFloat(forWardOperands);
    } catch (error) {}

    //Perform operation according to Operators
    switch (expression.charAt(index)) {
      case "+":
        result = operand1 + operand2;
        break;
      case "-":
        result = operand1 - operand2;
        break;
      case "*":
        result = operand1 * operand2;
        break;
      case "/":
        if (operand2 === 0) {
          break;
        }
        result = operand1 / operand2;
        break;
    }

    //Check forward and backward index if it not equal to zero then perform operation otherwise simply we break the Outer loop.
    if (backIndex !== 0 || forwardIndex !== 0) {
      const res = result.toString();
      expression =
        expression.substring(0, backIndex) +
        res +
        expression.substring(forwardIndex + 1);
    } else {
      break;
    }

    //Flag true or false to perform next iteraion of loop depend on operators exist or not in expression.
    for (let k = 0; k < expression.length; k++) {
      if (expression.charAt(k) === "-" && k === 0) {
        flag = false;
      } else if (
        expression.charAt(k) === "-" ||
        expression.charAt(k) === "+" ||
        expression.charAt(k) === "*" ||
        expression.charAt(k) === "/"
      ) {
        flag = true;
      }
    }
  }

  //Finally return Result
  return expression;
}

let lastOperand = "";
const buttonClick = (value) => {
  const myOperator = ["+", "-", "*", "/"];
  const firstOperator = ["+", "*", "/"];

  //Check first number only put - and another operator not put as first digit.
  if (totalExp.length === 0 && firstOperator.includes(value)) {
    return;
  } else {
    if (!myOperator.includes(value)) {
      if (myOperator.includes(totalExp.slice(-1))) {
        lastOperand = "";
      } else {
        lastOperand += totalExp.slice(-1);
      }

      //Avoid double zero
      if (value === "0" && totalExp.length === 0) {
        return;
      } else if (value === "." && lastOperand.length === 0) {
        value = "0.";
      }

      //Checking double dot
      if (value === "." && lastOperand.includes(".")) {
        return;
      }
      totalExp += value;
    } else {
      if (myOperator.includes(totalExp.slice(-1))) {
        lastOperand = "";
        return;
      } else {
        lastOperand += totalExp.slice(-1);
      }
      totalExp += value;
    }
  }
  inputValue.value = totalExp;
};

const buttonReset = () => {
  totalExp = "";
  inputValue.value = "";
  lastOperand = "";
};

const resultClick = () => {
  if (
    totalExp.slice(-1) === "+" ||
    totalExp.slice(-1) === "-" ||
    totalExp.slice(-1) === "*" ||
    totalExp.slice(-1) === "/"
  ) {
    inputValue.value = "Not a number";
  } else {
    if (inputValue.value) {
      let result = String(compute(String(inputValue.value)));
      result.includes(".")
        ? (inputValue.value = Number(result).toFixed(2))
        : (inputValue.value = result);
    }
  }
};

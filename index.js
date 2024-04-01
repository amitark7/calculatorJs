let totalExp = "";

let inputValue = document.querySelector(".input-box");
function precendence(operator) {
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
      if (precendence(expression.charAt(i)) > priority) {
        index = i;
        priority = precendence(expression.charAt(i));
      }
    }

    //Some temporary variable to store backward value and foward value of Operators.
    let temp = "";
    let temp1 = "";
    let temp2 = "";

    //Find Backward Operands of Operators.
    for (
      let k = index - 1;
      (k >= 0 && expression.charAt(k) >= "0" && expression.charAt(k) <= "9") ||
      expression.charAt(k) === "." ||
      (expression.charAt(k) === "-" && k === 0);
      k--
    ) {
      temp += expression.charAt(k);
      backIndex = k;
    }

    //Reverse Backward Operands and store in temp1 after got Backward Operands beacause when we traverse backward of Operators we got reverse number.
    temp1 = temp.split("").reverse().join("");

    //To find Forward Operands of Operators.
    for (
      let k = index + 1;
      (k < expression.length &&
        expression.charAt(k) >= "0" &&
        expression.charAt(k) <= "9") ||
      expression.charAt(k) === "." ||
      (expression.charAt(k) === "-" && k === 0);
      k++
    ) {
      temp2 += expression.charAt(k);
      forwardIndex = k;
    }
    try {
      //Convert String to Number.
      operand1 = parseFloat(temp1);
      operand2 = parseFloat(temp2);
    } catch (error) {
      console.log(error);
    }

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
      let res = result.toString();
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
  let myOperator = ["+", "-", "*", "/"];
  let firstOperator = ["+", "*", "/"];

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
        console.log("Dot Check");
        return;
      }
      totalExp += value;
      console.log("Last Line");
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
      console.log(inputValue.value);
      let result = String(compute(String(inputValue.value)));
      result.includes(".")
        ? (inputValue.value = Number(result).toFixed(2))
        : (inputValue.value = result);
    } else {
      console.log("Please Enter New Expression");
    }
  }
};

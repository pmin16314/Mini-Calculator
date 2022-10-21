//calculator calss with clear, deleteNum, appendNum, displayNum, operation methods
class Calculator {
  constructor(previousValueInHtml, currentValueInHtml) {
    this.previousValueInHtml = previousValueInHtml;
    this.currentValueInHtml = currentValueInHtml;
    this.clear();
  }

  //clear all
  clear() {
    this.previousValue = "";
    this.currentValue = "";
    this.operation = undefined;
  }

  //delete numbers
  deleteNum() {
    this.currentValue = this.currentValue.substr(0, this.currentValue.length - 1);
  }

  //append numbers in real time
  appendNum(number) {
    if (number === "." && this.currentValue.toString().substr(-1) === ".") {
      this.deleteNum();
      return;
    }

    if (number === "." && this.currentValue.includes(".")) {
      return;
    }
    this.currentValue = this.currentValue.toString() + number.toString();
  }

  //modify numbers before display
  modifyDisplay(number) {
    const stringNumber = number.toString();
    const intPart = parseFloat(stringNumber.split(".")[0]);
    const floatPart = stringNumber.split(".")[1];

    let outPut;
    if (isNaN(intPart)) {
      outPut = "";
    } else {
      outPut = intPart.toLocaleString("en", { maximumFractionDigits: 0 });
    }

    if (floatPart != null) {
      return `${outPut}.${floatPart}`;
    } else {
      return outPut;
    }

    return number;
  }

  //display results
  dispalyNum() {
    this.currentValueInHtml.innerText = this.modifyDisplay(this.currentValue);
    if (this.operation != null) {
      this.previousValueInHtml.innerText = `${this.modifyDisplay(this.previousValue)} ${this.operation}`;
    } else {
      this.previousValueInHtml.innerText = "";
    }
  }

  //select the operand and pass it to doOperation
  slectOperation(operation) {
    if (this.currentValue === "") return;
    if (this.previousValue !== "") {
      this.doOperation();
    }
    this.operation = operation;
    this.previousValue = this.currentValue;
    this.currentValue = "";
  }

  //do the +,-,*,/ operations
  doOperation() {
    let fValue;
    const prev = parseFloat(this.previousValue);
    const curnt = parseFloat(this.currentValue);
    console.log(this.operation);

    switch (this.operation) {
      case "+":
        fValue = prev + curnt;
        break;
      case "-":
        fValue = prev - curnt;
        break;
      case "x":
        fValue = prev * curnt;
        break;
      case "/":
        fValue = prev / curnt;
        break;
      default:
        return;
    }

    console.log(fValue);
    this.currentValue = fValue;
    this.operation = undefined;
    this.previousValue = "";
  }
}

//select queries in the html
const numbers = document.querySelectorAll("[button-number]");
const operands = document.querySelectorAll("[button-operator]");
const clear = document.querySelector("[button-clear]");
const deletenum = document.querySelector("[button-delete]");
const equal = document.querySelector("[button-equal]");
const currentValueInHtml = document.querySelector(".current-operation");
const previousValueInHtml = document.querySelector(".previous-operation");

//create Calculator object with name of calculator

const calculator = new Calculator(previousValueInHtml, currentValueInHtml);

//catch all number buttons pressing
numbers.forEach((button) => {
  button.addEventListener("click", () => {
    console.log(button.innerText);
    calculator.appendNum(button.innerText);
    calculator.dispalyNum();
  });
});

//catch all operand buttons pressing
operands.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.slectOperation(button.innerText);
    calculator.dispalyNum();
  });
});

//catch clear button pressing
clear.addEventListener("click", () => {
  calculator.clear();
  calculator.dispalyNum();
  console.log(clear.innerText);
});

//catch delete button pressing
deletenum.addEventListener("click", () => {
  calculator.deleteNum();
  calculator.dispalyNum();
  console.log(deletenum.innerText);
});

//catch equal button pressing
equal.addEventListener("click", () => {
  console.log(equal.innerText);
  calculator.doOperation();
  calculator.dispalyNum();
});

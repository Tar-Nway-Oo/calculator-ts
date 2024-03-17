class Calculator {

  prevOperand: string;
  currOperand: string;
  operator: string | null

  constructor(p: string, c: string, o: string | null) {
    this.prevOperand = p
    this.currOperand = c;
    this.operator = o;
    this.clearAll();
  }

  appendNumber(number: string) {
    if (number === "." && this.currOperand.includes(".")) return;
    this.currOperand = this.currOperand + number;
  }

  chooseOperator(operator: string) {
    if (this.currOperand === "") return;
    if (this.prevOperand !== "") {
      this.calculate();
    }
    this.operator = operator;
    this.prevOperand = this.currOperand;
    this.currOperand = "";
  }

  calculate() {
    let result;
    const prev = parseFloat(this.prevOperand);
    const curr = parseFloat(this.currOperand);
    if (isNaN(prev) || isNaN(curr)) return;
    switch (this.operator) {
      case ("+") :
         result = prev + curr;
          break;
      case ("-") :
         result = prev - curr;
          break;
      case ("×") :
         result = prev * curr;
         break;
      case ("÷") :
         result = prev / curr;
          break;
      default : 
        result = "";
   }
   this.prevOperand = "";
   this.currOperand = result.toString();
   this.operator = null;
  }

  delete() {
    if (this.currOperand === "") {
      if (this.operator != null) {
        this.operator = null;
        this.currOperand = this.prevOperand;
        this.prevOperand = "";
        return;
      }
    } else {
      this.currOperand = this.currOperand.slice(0, -1);
    }
    }

    clearAll() {
      this.prevOperand = "";
      this.currOperand = "";
      this.operator = null;
    }

    updateDisplay() {
      if (this.operator != null) {
        previousOperand.textContent = (this.prevOperand) + this.operator;
      } else {
        previousOperand.textContent = (this.prevOperand);
      }
      currentOperand.textContent = (this.currOperand);
    }

  }

const previousOperand = document.querySelector("[data-previous-operand]") as HTMLParagraphElement;
const currentOperand = document.querySelector("[data-current-operand]") as HTMLParagraphElement;
const numberBtns = document.querySelectorAll("[data-number]") as NodeListOf<HTMLButtonElement>;
const operatorBtns = document.querySelectorAll("[data-operator]") as NodeListOf<HTMLButtonElement>;
const allClearBtn = document.querySelector("[data-all-clear]") as HTMLButtonElement;
const deleteBtn = document.querySelector("[data-delete]") as HTMLButtonElement;
const equalBtn = document.querySelector("[data-equals]") as HTMLButtonElement;


const calculator = new Calculator(previousOperand.textContent || "", currentOperand.textContent || "", null);

numberBtns.forEach(btn => {
   btn.addEventListener("click", () => {
      if (btn.textContent == null) return;
      calculator.appendNumber(btn.textContent);
      calculator.updateDisplay();
   }
   )
});

operatorBtns.forEach(btn => {
   btn.addEventListener("click", () => {
      if (btn.textContent == null) return;
      calculator.chooseOperator(btn.textContent)
      calculator.updateDisplay();
   })
});

equalBtn.addEventListener("click", () => {
   calculator.calculate();
   calculator.updateDisplay();
});

deleteBtn.addEventListener("click", () => {
   calculator.delete();
   calculator.updateDisplay();
});

allClearBtn.addEventListener("click", () => {
   calculator.clearAll();
   calculator.updateDisplay();
});

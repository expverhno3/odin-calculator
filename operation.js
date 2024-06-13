
function add(a, b) {
    return a + b;
  }
  
function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
      return "Error: Division by zero";
    }
    return a / b;
}

function operate(operator, a, b) {
    switch (operator) {
      case '+':
        return add(a, b);
      case '-':
        return subtract(a, b);
      case '*':
        return multiply(a, b);
      case '/':
        return divide(a, b);
      default:
        return null;
    }
}

let firstNumber = '';
let secondNumber = '';
let currentOperator = '';
let result = '';
let displayValue = '0';
const display = document.querySelector('.display');

function updateDisplay() {
  display.textContent = displayValue;
}

document.querySelectorAll('.btn.number').forEach(button => {
  button.addEventListener('click', () => {
    if (currentOperator === '') {
      firstNumber += button.textContent;
      displayValue = firstNumber;
    } else {
      secondNumber += button.textContent;
      displayValue = secondNumber;
    }
    updateDisplay();
  });
});

document.querySelectorAll('.btn.operator').forEach(button => {
  button.addEventListener('click', () => {
    if (firstNumber !== '' && secondNumber === '') {
      currentOperator = button.textContent;
    } else if (firstNumber !== '' && secondNumber !== '') {
      result = operate(currentOperator, parseFloat(firstNumber), parseFloat(secondNumber)).toString();
      firstNumber = '';
      secondNumber = '';
      currentOperator = button.textContent;
      displayValue = result;
      updateDisplay();
    }
  });
});

document.querySelector('.btn.equals').addEventListener('click', () => {
  if (firstNumber !== '' && currentOperator !== '' && secondNumber !== '') {
    displayValue = operate(currentOperator, parseFloat(firstNumber), parseFloat(secondNumber)).toString();
    result = displayValue;
    firstNumber = '';
    secondNumber = '';
    currentOperator = '';
    updateDisplay();
  }
});

document.querySelector('.btn.clear').addEventListener('click', () => {
  firstNumber = '';
  secondNumber = '';
  currentOperator = '';
  result = '';
  displayValue = '0';
  updateDisplay();
});

document.querySelector('.btn.decimal').addEventListener('click', () => {
  if (currentOperator === '') {
    if (!firstNumber.includes('.')) {
      firstNumber += '.';
      displayValue = firstNumber;
      updateDisplay();
    }
  } else {
    if (!secondNumber.includes('.')) {
      secondNumber += '.';
      displayValue = secondNumber;
      updateDisplay();
    }
  }
});

document.querySelector('.btn.backspace').addEventListener('click', () => {
    if (currentOperator === '') {
      firstNumber = firstNumber.slice(0, -1);
      displayValue = firstNumber || '0';
    } else {
      secondNumber = secondNumber.slice(0, -1);
      displayValue = secondNumber || '0';
    }
    updateDisplay();
});

document.addEventListener('keydown', (event) => {
    console.log(event.key)
    const key = event.key;
    if (!isNaN(key)) {
      document.querySelector(`.btn.number[data-key="${key}"]`).click();
    } else if (['+', '-', '*', '/'].includes(key)) {
      document.querySelector(`.btn.operator[data-key="${key}"]`).click();
    } else if (key === 'Enter' || key === '=') {
      document.querySelector('.btn.equals').click();
    } else if (key === 'Backspace') {
      document.querySelector('.btn.backspace').click();
    } else if (key === 'Escape' || key === 'c') {
      document.querySelector('.btn.clear').click();
    } else if (key === '.') {
      document.querySelector('.btn.decimal').click();
    }
  });
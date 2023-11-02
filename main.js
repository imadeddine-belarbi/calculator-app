let equation = ['0'];
let currentInputNumber = '';
const symbols = ['+', '-', '*', '/'];

const display = document.querySelector('input');
display.value = equation.join('');

const btnsOperation = document.querySelectorAll("button[data-type=operator]");
btnsOperation.forEach((btn) =>
{
  btn.addEventListener("click", (e) =>
  {
    switch (e.target.innerText)
    {
      case "AC":
        clear();
        break;
      case "C":
        backspace();
        break;
      case "%":
        addPercent();
        break;
      case "=":
        calculate();
        break;
      default:
        addSymbol(e.target.innerText);
        break;
    }
    display.value = equation.join('');
  })
})

const btnsOperand = document.querySelectorAll("button[data-type=operand]");
btnsOperand.forEach((btn) =>
{
  btn.addEventListener("click", (e) =>
  {
    if (e.target.innerText === '%')
      addPercent();
    else
      addNumber(e.target.innerText);

    display.value = equation.join('');
  })
})

function addSymbol(symbol)
{
  if (currentInputNumber !== '')
  {
    equation.push(symbol);
    currentInputNumber = '';
  }
}

function addPercent()
{
  if (currentInputNumber !== '')
    equation[equation.length - 1] = (+equation[equation.length - 1] / 100).toString();
}

function addNumber(number)
{
  if ((equation.length === 1 && equation[0] === '0') || currentInputNumber !== '')
  {
    currentInputNumber += number;
    equation[equation.length - 1] = currentInputNumber;
  }
  else 
  {
    equation.push(number);
    currentInputNumber = number;
  }
}

function clear()
{
  currentInputNumber = '';
  equation = ['0'];
}

function backspace()
{
  if (equation.length === 1)
  {
    if (equation[0] === '0')
      return;
    else if (equation[equation.length - 1].length === 1)
    {
      equation = ['0'];
      currentInputNumber = '';
    }
  }
  else if (equation[equation.length - 1].length === 1)
  {
    equation.pop();
    currentInputNumber = '';
  }
  else if (currentInputNumber === '')
  {
    equation[equation.length - 1] = equation[equation.length - 1].slice(0, -1);
    currentInputNumber = equation[equation.length - 1];
  }
  else
  {
    currentInputNumber = currentInputNumber.slice(0, -1);
    equation[equation.length - 1] = currentInputNumber;
  }
}

function calculate()
{
  try
  {
    results = eval(equation.join(''));
    console.log(results);
    if (results === Infinity)
    {
      display.value = "Divsion by zero";
      equation = ['0'];
      currentInputNumber = '';
    }
    else
    {
      currentInputNumber = results.toString();
      equation = [currentInputNumber];
    }
  }
  catch {
    equation = ['0'];
    currentInputNumber = '';
    display.value = "Error";
  }
}
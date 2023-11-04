let equation = ['0'];
let currentInputNumber = '';
let result = '';
let calc = false;
const symbols = ['+', '-', '*', '/'];

const display = document.querySelector('input');
display.value = equation.join('');

const btns = document.querySelectorAll("button");
btns.forEach(btn => btn.addEventListener('click', e =>
{
  renderButtons(e.target);
  displayResult();
  renderError();
}));

function renderButtons(btn)
{
  if (btn.getAttribute('data-type') === 'operator')
    renderOperatorButtons(btn.innerText);
  else if (btn.getAttribute('data-type') === 'operand')
  {
    renderOperandButtons(btn);
  }
}

function renderOperatorButtons(operator)
{
  switch (operator)
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
      addSymbol(operator);
      break;
  }
}

function renderOperandButtons(btn)
{
  if (btn.innerText === '%')
    addPercent();
  else
    addNumber(btn.innerText);
}

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
  {
    equation[equation.length - 1] = (+equation[equation.length - 1] / 100).toString();
    currentInputNumber = equation[equation.length - 1];
  }
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
  if (equation.length === 1 && equation[0] === '0')
    return;

  if (equation[equation.length - 1].length > 1)
  {
    equation[equation.length - 1] = equation[equation.length - 1].slice(0, -1);
    currentInputNumber = equation[equation.length - 1];
  }
  else if (equation.length === 1)
  {
    equation = ['0'];
    currentInputNumber = '';
  }
  else
  {
    equation.pop();
    currentInputNumber = '';
  }
}

function calculate()
{
  calc = true;
  if (symbols.includes(equation[equation.length - 1]))
  {
    result = 'Error';
    return;
  }
  result = evaluate();

  if (result !== 'Error' && result !== 'Division By Zero')
  {
    equation = [result];
    currentInputNumber = result;
  }
  else
  {
    equation = ['0'];
    currentInputNumber = '';
  }
}

function evaluate()
{
  const eval = [...equation];

  const isDivisionByzero = multiplicationAndDivisionOpeartions(eval);
  if (isDivisionByzero)
    return 'Division By Zero';
  additionAndSubtractionOperations(eval);

  return eval[0];
}

function multiplicationAndDivisionOpeartions(eval)
{
  let operator = '';
  for (let i = 1; i < eval.length; i++)
  {
    operator = eval[i];
    if (operator === '*' || operator === '/')
    {
      if (operator === '*')
        eval[i] = `${+eval[i - 1] * +eval[i + 1]}`;
      else
      {
        if (eval[i + 1] === '0')
          return true;
        eval[i] = `${+eval[i - 1] / +eval[i + 1]}`;
      }
      eval.splice(i - 1, 1);
      eval.splice(i, 1);
      i = 0;
    }
  }
  return false;
}

function additionAndSubtractionOperations(eval)
{
  let operator = '';
  for (let i = 1; i < eval.length; i++)
  {
    operator = eval[i];
    if (operator === '+' || operator === '-')
    {
      if (operator === '+')
        eval[i] = `${+eval[i - 1] + +eval[i + 1]}`;
      else
        eval[i] = `${+eval[i - 1] - +eval[i + 1]}`;

      eval.splice(i - 1, 1);
      eval.splice(i, 1);
      i = 0;
    }
  }
}

function displayResult()
{
  if (calc)
    display.value = result;
  else
    display.value = equation.join('');

  calc = false;
}

function renderError()
{
  if (result === 'Error' || result === 'Division By Zero')
  {
    equation = ['0'];
    currentInputNumber = '';
    result = '';
  }
}
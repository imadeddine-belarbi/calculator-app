let currentInput = '';
let lastChar = '+';
let currentNumber = '';
const symbols = ['+', '-', '%', '*', '/', '.'];

const display = document.querySelector('input');

function isAsymbol(v)
{
  for (let s of symbols)
    if (s === v)
      return true;
  return false;
}

function addToDisplay(v)
{
  lastChar = currentInput.charAt(currentInput.length - 1);
  if (!isAsymbol(lastChar) || !isAsymbol(v))
  {
    currentInput += v;
    display.value = currentInput;
  }
}

function clearDisplay()
{
  currentInput = '';
  display.value = '';
}

function backspaceDisplay()
{
  currentInput = currentInput.slice(0, -1);
  display.value = currentInput;
}

function calculate()
{
  try
  {
    currentInput = eval(currentInput).toString();
    display.value = currentInput;
  }
  catch {
    display.value = 'Error';
  }
}
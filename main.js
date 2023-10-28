let currentInput = '0';
let currentOperation = '0';
let lastChar = '';
const symbols = ['+', '-', '*', '/', '.'];

const display = document.querySelector('input');
display.value = currentOperation;

function isAsymbol(v)
{
  for (let s of symbols)
    if (s === v)
      return true;
  return false;
}

function addToDisplay(v)
{
  if (currentInput.length > 16)
    return;

  if (currentInput === '0')
    currentInput = '';
  lastChar = currentInput.length > 0 ? currentInput.charAt(currentInput.length - 1) : '+';
  if (!isAsymbol(lastChar) || !isAsymbol(v))
  {
    currentInput += v;
    display.value = currentInput;
    currentOperation += v;
  }
}

function addPercentToDisplay()
{
  if (currentInput.length > 16)
    return;
  lastChar = currentInput.length > 0 ? currentInput.charAt(currentInput.length - 1) : '+';
  if (!isAsymbol(lastChar))
  {
    currentInput += '%';
    display.value = currentInput;
    currentOperation += '/100';
  }
}

function clearDisplay()
{
  currentInput = '0';
  currentOperation = '0'
  display.value = '0';
}

function backspaceDisplay()
{
  if (currentInput === '0')
    return;

  lastChar = currentInput.charAt(currentInput.length - 1);
  currentOperation = lastChar === '%' ? currentOperation.slice(0, -1) : currentOperation.slice(0, -4);
  currentInput = currentInput.slice(0, -1);

  if (currentInput === '')
    currentInput = '0';
  display.value = currentInput;
}

function calculate()
{
  try
  {
    currentOperation = eval(currentOperation).toString();
    if (currentOperation === "Infinity")
    {
      currentInput = '0';
      currentOperation = '0';
      display.value = "Divsion by zero"
    }
    else
    {
      currentInput = currentOperation;
      display.value = currentOperation;
    }
  }
  catch {
    currentInput = '0';
    currentOperation = '0';
    display.value = "Error";
  }
}
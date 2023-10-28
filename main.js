let currentInput = '';
const display = document.querySelector('input');

function addToDisplay(v)
{
  currentInput += v;
  display.value = currentInput;
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
    currentInput = eval(currentInput);
    display.value = currentInput;
  }
  catch {
    display.value = 'Error';
  }
}
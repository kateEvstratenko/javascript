var oldOperation = '';
var currentRes = 0;
var isNewNumber = true;
var textBox = document.forms['textOut'];
var stateString = document.getElementById('stateString');

var $calculator = document.querySelector('.calculator');

$calculator.addEventListener('click', function (e) {
    if (e.target.dataset) {
        if (e.target.dataset.buttonType === 'number') {
            addNumber(e.target.dataset.buttonValue);
        } else if (e.target.dataset.buttonType === 'baseOperation') {
            baseOperation(e.target.dataset.buttonValue);
        } else if (e.target.dataset.buttonType === 'additionalOperation')
            additionalOperation(e.target.dataset.buttonValue);
    }
}, false);

function addNumber(number) {
	if (isNewNumber === false) {
	    if (textBox.result.value !== '0') {
			textBox.result.value += number;
		}
		else
		{
			textBox.result.value = number;
		}
	}
	else
	{
		textBox.result.value = number;
		isNewNumber = false;
	}
}

function baseOperation(operation)
{
    stateString.innerText = stateString.innerText + ' ' + textBox.result.value + ' ' + operation;
	if (oldOperation !== '')
	{
		switch(oldOperation)
		{
			case '+':
				currentRes += Number(textBox.result.value);
				break;
			case '-':
				currentRes -= Number(textBox.result.value);
				break;
			case '*':
				currentRes *= Number(textBox.result.value);
				break;
			case '/':
				currentRes /= Number(textBox.result.value);
				break;
		    case '^':
		        currentRes = Math.pow(currentRes, Number(textBox.result.value));
		        break;
		}		
		textBox.result.value = currentRes;
	}
	else
	{
		currentRes = Number(textBox.result.value);
	}
	if (operation !== '=')
	    oldOperation = operation;
	else {
	    oldOperation = '';
	    stateString.innerText = '';
	}
	isNewNumber = true;
}

function additionalOperation(operation){
    switch (operation)
    {
        case 'toFloat': 
            toFloat();
            break;
        case 'backspace':
            backspace();
            break;
        case 'clearAll':
            clearAll();
            break;
        case 'clearNumber':
            clearNumber();
            break;
        case 'negative':
            negative();
            break;
        case 'sqrt':
            sqrt();
            break;
        case 'inverse':
            inverse();
            break;
    }
}

function toFloat()
{
    if (isNewNumber === false) {
        if (textBox.result.value.indexOf('.', 0) === -1)
            textBox.result.value += '.';
    }
    else {
        textBox.result.value = '0.';
        isNewNumber = false;
    }
}

function backspace()
{
	textBox.result.value = textBox.result.value.slice(0, -1);
}

function clearAll()
{
	textBox.result.value = '0';
	currentRes = 0;
}

function clearNumber()
{
	textBox.result.value = '0';
}

function negative()
{
    textBox.result.value = -Number(textBox.result.value);
}

function sqrt()
{
    textBox.result.value = Math.sqrt(textBox.result.value);
    isNewNumber = true; 
}

function inverse()
{
    textBox.result.value = 1 / textBox.result.value;
    isNewNumber = true;
}
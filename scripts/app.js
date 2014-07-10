var textBox = document.forms['textOut'];
var stateString = document.getElementById('stateString');

var calculator = document.querySelector('.calculator');

var calc = new Calculator();

calculator.addEventListener('click', function (e) {
    if (e.target.dataset) {
        if (e.target.dataset.buttonType === 'number') {
            textBox.result.value = calc.addNumber(e.target.dataset.buttonValue, textBox.result.value);
        } else if (e.target.dataset.buttonType === 'baseOperation') {
            resultMas = calc.baseOperation(e.target.dataset.buttonValue, textBox.result.value, stateString.innerText);
            textBox.result.value = resultMas[0];
            stateString.innerText = resultMas[1];
            console.log(typeof (stateString.innerText));
        } else if (e.target.dataset.buttonType === 'additionalOperation')
            textBox.result.value = calc.additionalOperation(e.target.dataset.buttonValue, textBox.result.value);
    }
}, false);

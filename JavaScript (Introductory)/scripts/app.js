(function () {
    'use strict';

    var textBox = document.getElementById('result');
    var stateString = document.getElementById('stateString');
    var calculator = document.getElementById('calculator');

    var calc = new Calculator();

    calculator.addEventListener('click', function (e) {
        if (e.target.dataset) {
            var buttonValue = e.target.dataset.buttonValue;
            var buttonType = e.target.dataset.buttonType;
  
            switch (buttonType) {
                case 'number':
                    textBox.value = calc.addNumber(buttonValue, textBox.value);
                    break;
                case 'baseOperation':
                    var resultMas = calc.baseOperation(buttonValue, textBox.value, stateString.innerText);
                    textBox.value = resultMas[0];
                    if (stateString) {
                        stateString.innerText = resultMas[1];
                    }
                    break;
                case 'additionalOperation':
                    textBox.value = calc.additionalOperation(buttonValue, textBox.value);
                    break;
            }
        }
    }, false);
})();
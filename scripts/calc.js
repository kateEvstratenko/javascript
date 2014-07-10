function Calculator() {
    var oldOperation = '';
    var currentRes = 0;
    var isNewNumber = true;
    
    function _addNumber(number, textBox) {
        var resultNumber = number;

        if (!isNewNumber && textBox != '0') {
            resultNumber = textBox + number;
        }
        else {
            isNewNumber = false;
        }
        return resultNumber;
    }

    function _baseOperation(operation, textBox, stateString) {
        stateString = stateString + ' ' + textBox + ' ' + operation;
        if (oldOperation !== '') {
            switch (oldOperation) {
                case '+':
                    currentRes += Number(textBox);
                    break;
                case '-':
                    currentRes -= Number(textBox);
                    break;
                case '*':
                    currentRes *= Number(textBox);
                    break;
                case '/':
                    currentRes /= Number(textBox);
                    break;
                case '^':
                    currentRes = Math.pow(currentRes, Number(textBox));
                    break;
                case '=':
                    break;
            }
            textBox = currentRes;
        }
        else {
            currentRes = Number(textBox);
        }
        if (operation !== '=')
            oldOperation = operation;
        else {
            oldOperation = '';
            stateString = '';
        }
        isNewNumber = true;

        console.log(textBox);
        return [textBox, stateString];
    }

    function _additionalOperation(operation, textBox) {
        switch (operation) {
            case 'toFloat':
                if (!isNewNumber) {
                    if (textBox.indexOf('.', 0) === -1)
                        textBox += '.';
                }
                else {
                    textBox = '0.';
                    isNewNumber = false;
                }
                break;
            case 'backspace':
                textBox = textBox.slice(0, -1);
                break;
            case 'clearAll':
                textBox = '0';
                currentRes = 0;
                break;
            case 'clearNumber':
                textBox = '0';
                break;
            case 'negative':
                textBox = -Number(textBox);
                break;
            case 'sqrt':
                textBox = Math.sqrt(textBox);
                isNewNumber = true;
                break;
            case 'percent':
                textBox = currentRes * textBox / 100;
                break;
            case 'inverse':
                textBox = 1 / textBox;
                isNewNumber = true;
                break;
        }
        return textBox;
    }

    return {
        addNumber: _addNumber,
        baseOperation: _baseOperation,      
        additionalOperation: _additionalOperation,
    };
};




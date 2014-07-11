function Calculator() {
    'use strict';

    var oldOperation = '';
    var currentRes = 0;
    var isNewNumber = true;

    var EMPTY_VALUE_STRING = '0';

    
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

    var operations = {
        '+': function (currentRes, number) { return currentRes + number; },
        '-': function (currentRes, number) { return currentRes - number; },
        '*': function (currentRes, number) { return currentRes * number; },
        '/': function (currentRes, number) { return currentRes / number; },
        '^': function (currentRes, number) { return Math.pow(currentRes, number); },
    };

    function _baseOperation(operation, textBox, stateString) {
        stateString = stateString + ' ' + textBox + ' ' + operation;
        var value = Number(textBox);
        
        if (oldOperation) {
            currentRes = operations[oldOperation](currentRes, value);
            textBox = currentRes;
        }
        else {
            currentRes = value;
        }

        if (operation !== '=') {
            oldOperation = operation;
        }
        else {
            oldOperation = null;
            stateString = null;
        }

        isNewNumber = true;

        return [textBox, stateString];
    }

    var mathFunctions = {
        'sqrt': function (number) {
            isNewNumber = true;
            return Math.sqrt(number);
        },
        'backspace': function (number) { return number.slice(0, -1); },
        'clearAll': function (number) {
            currentRes = 0;
            return '0';
        },
        'clearNumber': function (number) { return '0'; },
        'negative': function (number) { return -number; },
        'percent': function (number) { return currentRes * number / 100; },
        'inverse': function (number) {
            isNewNumber = true;
            return 1 / number;
        },
        'toFloat': function (number) {
            if (!isNewNumber && number.indexOf('.') < 0) {
                number += '.';
            }
            else {
                number = '0.';
                isNewNumber = false;
            }
            return number;
        }
    };

    function _additionalOperation(currentOperation, textBox) {

        return mathFunctions[currentOperation](Number(textBox));
    }

    return {
        addNumber: _addNumber,
        baseOperation: _baseOperation,      
        additionalOperation: _additionalOperation,
    };
};




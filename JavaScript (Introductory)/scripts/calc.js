function Calculator() {
    'use strict';

    var oldOperation = '';
    var currentRes = 0;
    var isNewNumber = true;

    var EMPTY_VALUE_STRING = '0';

    function addNumber(number, textBox) {
        var resultNumber = number;

        if (!isNewNumber && textBox != EMPTY_VALUE_STRING) {
            resultNumber = textBox + number;
        }
        else {
            isNewNumber = false;
        }

        return resultNumber;
    }

    var operations = {
        '+': function (number) { return currentRes + number; },
        '-': function (number) { return currentRes - number; },
        '*': function (number) { return currentRes * number; },
        '/': function (number) { return currentRes / number; },
        '^': function (number) { return Math.pow(currentRes, number); },
    };

    function baseOperation(operation, textBox, stateString) {
        stateString = stateString + ' ' + textBox + ' ' + operation;
        var value = Number(textBox);
        
        if (oldOperation) {
            currentRes = operations[oldOperation](value);
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
        'backspace': function (number) {
            var res = number.slice(0, -1);
            return res ? res : EMPTY_VALUE_STRING;
        },
        'clearAll': function () {
            currentRes = 0;
            return EMPTY_VALUE_STRING;
        },
        'clearNumber': function () { return EMPTY_VALUE_STRING; },
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
                number = EMPTY_VALUE_STRING + '.';
                isNewNumber = false;
            }
            return number;
        }
    };

    function additionalOperation(currentOperation, textBox) {
        return (mathFunctions[currentOperation](textBox));
    }

    return {
        addNumber: addNumber,
        baseOperation: baseOperation,      
        additionalOperation: additionalOperation,
    };
};




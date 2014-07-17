function FunctionsLibrary() {

    function partial(func) {
        var args = Array.prototype.slice.call(arguments, 1);

        return function() {
            return func.apply(this, Array.prototype.concat.apply(args, arguments));
        };
    };

    function curry() {
        var fun;
        var n;
        var args;

        if (typeof arguments[0] === 'function') {
            fun = arguments[0];
            args = Array.prototype.slice.apply(arguments).slice(1);
            n = fun.length - args.length;
        }
        else {
            n = arguments[0];
            fun = arguments[1];
            args = Array.prototype.slice.apply(arguments).slice(2);
        }

        return function() {
            var newArgs = Array.prototype.slice.apply(arguments);
            var allCurrentArgs = Array.prototype.concat.apply(args, newArgs);
            var otherParamsCount = n - newArgs.length;

            if (otherParamsCount) {
                return curry.apply(this, Array.prototype.concat(otherParamsCount, fun, allCurrentArgs));
            } else {
                return fun.apply(this, allCurrentArgs);
            }
        };
    }

    function fold(arr, callback, initialValue) {
        var preValue, index;
        if (initialValue) {
            preValue = initialValue;
            index = 0;
        }
        else {
            preValue = arr[0];
            index = 1;
        }

        for (var i = index; i < arr.length; i++) {
            preValue = callback(preValue, arr[i]);
        }

        return preValue;
    }

    function unfold(callback, initialValue) {
        var state = initialValue;
        var newValue = null;
        var array = [];

        while (state) {
            if (newValue != null) {
                array.push(newValue);
            }
            var resMas = callback(state);
            state = resMas[0];
            newValue = resMas[1];
        }

        return array;
    }

    function map(array, callback) {
        for (var i = 0; i < array.length; i++) {
            array[i] = callback(array[i]);
        }
        return array;
    }

    function filter(array, callback) {
        var resMas = [];
        for (var i = 0; i < array.length; i++) {
            var elem = array[i];
            if (callback(elem)) {
                resMas.push(elem);
            }
        }
        return resMas;
    }

    function firstElement(array, callback) {
        return filter(array, callback)[0];
    }

    function lazy(func) {
        var result = null;
        var args = Array.prototype.slice.call(arguments, 1);

        return function () {
            if (!result) {
                result = func.apply(this, args);
            }
            return result;
        };
    }

    function memoisation(func) {
        var cache = [];

        return function () {
            var res = null;
            var arg = arguments[0];
            if (typeof arg !== 'function') {
                if (arg in cache) {
                    res = cache[arg];
                } else {
                    res = func.call(this, arg);
                    cache[arg] = res;
                }
            }

            return res;
        };
    }

    return {
        partial: partial,
        curry: curry,
        fold: fold,
        unfold: unfold,
        map: map,
        filter: filter,
        firstElement: firstElement,
        lazy: lazy,
        memoisation: memoisation
    };
};

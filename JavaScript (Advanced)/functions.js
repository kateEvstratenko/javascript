function functionsLibrary() {

    function _partial(func) {
        var args = Array.prototype.slice.apply(arguments).slice(1);

        return function () {
            return func.apply(this, Array.prototype.concat.apply(args, arguments));
        }
    }

    function _curry() {
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

        return function () {
            var newArgs = Array.prototype.slice.apply(arguments);
            var allCurrentArgs = Array.prototype.concat.apply(args, newArgs);
            var otherParamsCount = n - newArgs.length;

            if (otherParamsCount) {
                return _curry.apply(this, Array.prototype.concat(otherParamsCount, fun, allCurrentArgs));
            }
            else {
                return fun.apply(this, allCurrentArgs);
            }
        }
    }

    function _fold(arr, callback, initialValue) {
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

    function _unfold(callback, initialValue) {
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

    function _map(array, callback) {
        for (var i = 0; i < array.length; i++) {
            array[i] = callback(array[i]);
        }
        return array;
    }

    function _filter(array, callback) {
        var resMas = [];
        for (var i = 0; i < array.length; i++) {
            var elem = array[i];
            if (callback(elem)) {
                resMas.push(elem);
            }
        }
        return resMas;
    }

    function _firstElement(array, callback) {
        return _filter(array, callback)[0];
    }

    function _lazy() {       
        var args;
        var func;
        
        if (typeof arguments[0] === 'function') {
            console.log('sfsdf');
            func = arguments[0];
            args = Array.prototype.slice.apply(arguments).slice(1);
        } else {
            args = Array.prototype.slice.apply(arguments);
        }

        return function () {
            console.log('gj');
            var a = arguments[0];
            if (typeof a === 'function') {

                return _lazy.apply(this, args);
                //  } else {
                //       return func.apply(this, args);
                //   }
            } else {
                console.log('else');
                return func.apply(this, args);
            }
        };
    }
    

    //function calc(a, b, c) {
    //    console.log(a);
    //    return a + b + c;
    //}

    //function lazy(f, args) { }

    //var lazyCalc = lazy(calc, 1, 2, 3);

    //lazyCalc();
    //var lazyCalc = lazy(_memoisation, _lazy);

    function _memoisation(func) {
        var cache = [];

        return function() {
            var res;
            var arg = arguments[0];
            if (typeof arg !== 'function') {
                if (arg in cache) {
                    res = cache[arg];
                    //console.log('from cache');
                } else {
                    res = func.call(this, arg);
                    cache[arg] = res;
                    //console.log('not from cache');
                }
            }

            return res;
        };
    }

    return {
        partial: _partial,
        curry: _curry,
        fold: _fold,
        unfold: _unfold,
        map: _map,
        filter: _filter,
        firstElement: _firstElement,
        lazy: _lazy,
        memoisation: _memoisation
    };
};

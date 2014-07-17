(function () {
    var functionsCollect = new functionsLibrary();

    var f = functionsCollect.partial(sum,  2);
    var res = f(5, 6, 7);
    console.log('partial: ' + res);

    var cur = functionsCollect.curry(mul);
    var res = cur(2)(3)(4);
    console.log('curry: ' + res);

    var foldArray = [1, 2, 3, 5];
    var foldRes = functionsCollect.fold(foldArray, sumElements, 0);
    console.log('folding: '  + foldRes);

    var unfoldRes = functionsCollect.unfold(cube, 1);
    console.log('unfolding:' + unfoldRes);

    var mapArray = [1, 2, 3];
    var mapRes = functionsCollect.map(mapArray, sqr);
    console.log('map: ' + mapRes);

    var arrayForFilter = [1, 2, 3, 0, -1, -2, -3, 6];
    var evenNumbers = functionsCollect.filter(arrayForFilter, isEven);
    console.log('filter: ' + evenNumbers);
    /*7. average of even numbers*/
    var averageEvenNumbers = functionsCollect.fold(evenNumbers, sumElements) / evenNumbers.length;
    console.log('average of even numbers: ' + averageEvenNumbers);

    /*8. summ of 10 random numbers*/
    var randomArray = [];
    for (var i = 0; i < 5; i++) {
        var randomNumber = Math.floor(Math.random() * 20 - 10);
        randomArray.push(randomNumber);
    }
    var sumRandomNumbers = functionsCollect.fold(randomArray, sumElements);
    console.log('random array: ' + randomArray);
    console.log('sum of random array: ' + sumRandomNumbers);

    var arrayForFirstMethod = [1, -3, 4, 0, 3, 2, 5];
    console.log('first of even: ' + functionsCollect.firstElement(arrayForFirstMethod, isEven));

    var lazyRes = functionsCollect.lazy(sum, 4,5,6);
    console.log('lazy: ' + lazyRes);
    //console.log(lazyRes());
    //lazyRes = functionsCollect.lazy(sum, [2, 8]);
    //console.log(lazyRes());

    var sqr = functionsCollect.memoisation(sqr);
    console.log('memoization: ' + sqr(5));
    //console.log(sqr(5));
    //console.log(sqr(6));


    /*functions*/

    /*for filter*/
    function isEven(value) {
        return (value % 2 === 0)
    }

    /*for map*/
    function sqr(value) {
        return value * value;
    }

    /*for unfold*/
    function cube(state) {
        var resValue = Math.pow(state, 3);
        var newState = state + 1 < 10 ? state + 1 : null;
        var resMas = [newState, resValue];
        return resMas;
    }

    /*for fold*/
    function sumElements(previousValue, currentValue/*, index, array*/) {
        return previousValue + currentValue;
    }
    
    function mul(x, y, z) {
        var m = 1;
        for (var i = 0; i < arguments.length; i++) {
            m = m * Number(arguments[i]);
        }
        return m;
    }

    function sum(sss) {
        var s = 0;
        for (var i = 0; i < arguments.length; i++) {
            s += Number(arguments[i]);
        }
        console.log(s);
        return s;
    }
}());


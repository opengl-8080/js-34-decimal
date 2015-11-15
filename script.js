function NumberConverter(base) {
    var _decodeMap = {
        j: 'i', k: 'j', l: 'k', m: 'l', n: 'm', p: 'n', q: 'o',
        r: 'p', s: 'q', t: 'r', u: 's', v: 't', w: 'u', x: 'v',
        y: 'w', z: 'x'
    };

    var _encodeMap = _.invert(_decodeMap);

    var _string;
    var _integer;

    if (_.isString(base)) {
        _string = base;
        _integer = _toInt(base);
    } else {
        _string = _toString(base);
        _integer = base;
    }

    this.increment = function() {
        return new NumberConverter(_integer + 1);
    };

    this.toInt = function() {
        return _integer;
    };

    this.toString = function() {
        return _string;
    };

    function _toInt(string) {
        var decodedText = _replaceEachLetter(string, _decode);

        return parseInt(decodedText, 34);
    }

    function _toString(integer) {
        return _replaceEachLetter(integer.toString(34), _encode);
    }

    function _replaceEachLetter(string, mapping) {
        return _.map(string.split(''), mapping).join('');
    }

    function _encode(c) {
        return (c in _encodeMap) ? _encodeMap[c] : c;
    }

    function _decode(c) {
        return (c in _decodeMap) ? _decodeMap[c] : c;
    }
}

test('1 + 1 = 2', function() {
    // setup
    var converter = new NumberConverter(1);
    
    // verify
    strictEqual(converter.increment().toString(), '2');
});

test('h + 1 = j', function() {
    // setup
    var converter = new NumberConverter('h');
    
    // verify
    strictEqual(converter.increment().toString(), 'j');
});

test('j + 1 = k', function() {
    // setup
    var converter = new NumberConverter('j');
    
    // verify
    strictEqual(converter.increment().toString(), 'k');
});

test('n + 1 = p', function() {
    // setup
    var converter = new NumberConverter('n');
    
    // verify
    strictEqual(converter.increment().toString(), 'p');
});

test('1 -> "1"', function() {
    // setup
    var converter = new NumberConverter(1);
    
    // verify
    strictEqual(converter.toString(), '1');
});

test('17 -> "h"', function() {
    // setup
    var converter = new NumberConverter(17);
    
    // verify
    strictEqual(converter.toString(), 'h');
});

test('18 -> "j"', function() {
    // setup
    var converter = new NumberConverter(18);
    
    // verify
    strictEqual(converter.toString(), 'j');
});

test('24 -> "q"', function() {
    // setup
    var converter = new NumberConverter(24);
    
    // verify
    strictEqual(converter.toString(), 'q');
});

test('"1" -> 1', function() {
    // setup
    var converter = new NumberConverter('1');
    
    // verify
    strictEqual(converter.toInt(), 1);
});

test('"h" -> 17', function() {
    // setup
    var converter = new NumberConverter('h');
    
    // verify
    strictEqual(converter.toInt(), 17);
});

test('"j" -> 18', function() {
    // setup
    var converter = new NumberConverter('j');
    
    // verify
    strictEqual(converter.toInt(), 18);
});

test('"n" -> 22', function() {
    // setup
    var converter = new NumberConverter('n');
    
    // verify
    strictEqual(converter.toInt(), 22);
});

test('"p" -> 23', function() {
    // setup
    var converter = new NumberConverter('p');
    
    // verify
    strictEqual(converter.toInt(), 23);
});

test('"z" -> 33', function() {
    // setup
    var converter = new NumberConverter('z');
    
    // verify
    strictEqual(converter.toInt(), 33);
});

test('"10" -> 34', function() {
    // setup
    var converter = new NumberConverter('10');
    
    // verify
    strictEqual(converter.toInt(), 34);
});

test('"1h" -> 51', function() {
    // setup
    var converter = new NumberConverter('1h');
    
    // verify
    strictEqual(converter.toInt(), 51);
});

test('"1j" -> 52', function() {
    // setup
    var converter = new NumberConverter('1j');
    
    // verify
    strictEqual(converter.toInt(), 52);
});

test('"1z" -> 67', function() {
    // setup
    var converter = new NumberConverter('1z');
    
    // verify
    strictEqual(converter.toInt(), 67);
});


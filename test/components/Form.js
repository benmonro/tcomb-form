'use strict';
var tape = require('tape');
var t = require('../../');
var Form = t.form.Form;



var path = require('path');
var fs = require('fs');
var jsonString = fs.readFileSync(path.join(__dirname, '../sample/data.json'), 'utf8');

var sample = JSON.parse(jsonString); // require('../../samples/simpleForm');
var transformer = {
    format: function (value) {
        return t.Str.is(value) ? value : value === true ? '1' : '0';
    },
    parse: function (value) {
        return value === '1';
    }
};

tape('Form', function(tape) {
    console.log('testttt')
    tape.test('value', function(tape) {
        tape.plan(1);
        var schema = t.struct({
            policy:t.enums.of("option1 option2 option3")
        });
        tape.strictEqual(
            new Form({
                options:sample.options,
                type:schema,
                value:sample.value
            }),
        'option2', 'should handle option from json');

    });
});
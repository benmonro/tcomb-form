'use strict';
var tape = require('tape');
var t = require('../../');
var Form = t.form.Form;



var path = require('path');
var fs = require('fs');var transformer = {
    format: function (value) {
        return t.Str.is(value) ? value : value === true ? '1' : '0';
    },
    parse: function (value) {
        return value === '1';
    }
};

if (typeof window !== 'undefined') {


    tape.only('Form', function (tape) {
        console.log('testttt')
        tape.test('value', function (tape) {
            tape.plan(1);

            var sample = JSON.parse('{ "options": { "fields":{ "policy":{ "options":[ {"value":"option1", "text":"option 1"}, {"value":"option2", "text":"option 2"}, {"value":"option3", "text":"option 3"} ] } } }, "value": { "policy": "option2" } }');

            var schema = t.struct({
                policy: t.enums.of("option1 option2 option3")
            });
            tape.strictEqual(
                new Form({
                    options: sample.options,
                    type: schema,
                    value: sample.value
                }),
                'option2', 'should handle option from json');

        });
    });
}
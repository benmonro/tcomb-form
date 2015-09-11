'use strict';
var tape = require('tape');
var t = require('../../');
var Form = t.form.Form;
var path = require('path');
var React = require('react');
var ReactDom = require('react-dom');
var fs = require('fs');

var sample = JSON.parse('{"options":{"fields":{"policy":{"options":[{"value":"option1","text":"option 1"},{"value":"option2","text":"option 2"},{"value":"option3","text":"option 3"}]}}},"value":{"policy":"option2"}}');

if (typeof window !== 'undefined') {

    tape('Form', function(tape) {

        tape.test('value', function(tape) {


            tape.plan(1); // ************ set to tape.plan(2) to stop Karma and see the form in the browser *************


            var schema = t.struct({
                policy: t.enums.of('option1 option2 option3')
            });
            var node = document.createElement('div');
            document.body.appendChild(node);
            var component = ReactDom.render(React.createElement(Form, {
                options: sample.options,
                type: schema,
                value: sample.value
            }), node);
            tape.deepEqual(component.getValue(), {policy: 'option2'});
        });

    });

}

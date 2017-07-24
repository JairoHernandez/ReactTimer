var expect = require('expect');
var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var $ =require('jquery');

var CountdownForm = require('CountdownForm');

describe('CountdownForm', () => {
    it('should exist', () => {
        expect(CountdownForm).toExist();
    });

    it('should call onSetCountdown if valid seconds entered', () => {
        var spy = expect.createSpy();
        var countdownForm = TestUtils.renderIntoDocument(<CountdownForm onSetCountdown={spy}/>);
        //console.log(countdownForm);
        var $el = $(ReactDOM.findDOMNode(countdownForm));

        // Just like we would access refs in a regular component function.
        countdownForm.refs.seconds.value = '109';
        // Now simulate a submit.
        //console.log($el.find('form')[0]);
        TestUtils.Simulate.submit($el.find('form')[0]);

        expect(spy).toHaveBeenCalledWith(109);
    });

    it('should not call onSetCountdown if invalid seconds entered', () => {
        var spy = expect.createSpy();
        var countdownForm = TestUtils.renderIntoDocument(<CountdownForm onSetCountdown={spy}/>);
        //console.log(countdownForm);
        var $el = $(ReactDOM.findDOMNode(countdownForm));

        // Just like we would access refs in a regular component function.
        countdownForm.refs.seconds.value = '109b';
        // Now simulate a submit.
        //console.log($el.find('form')[0]);
        TestUtils.Simulate.submit($el.find('form')[0]);

        expect(spy).toNotHaveBeenCalled(); // Does not take args.
    });
});